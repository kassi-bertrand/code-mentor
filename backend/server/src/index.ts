import os from "os";
import path from "path";
import cors from "cors";
import express, { Express } from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import { LockManager } from "./utils";

import { z } from "zod";
import { Playground, User } from "./types";

import {
  MAX_BODY_SIZE,
  createFileRL,
  createFolderRL,
  deleteFileRL,
  renameFileRL,
  saveFileRL,
} from "./ratelimit";

import { getPlaygroundFiles, saveFile } from "./fileoperations";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

let inactivityTimeout: NodeJS.Timeout | null = null;
let isOwnerConnected = false;

const containers: Record<string, Playground> = {};
const connections: Record<string, number> = {};

// "io.use" is used to define middleware functions that
// run before the actual connection to the socket is
// established. This middleware is invoked whenever a
// client attempts to establish a connection, and it
// allows you to inspect or modify the connection request,
// perform authentication, or block the connection
// based on certain conditions.
io.use(async (socket, next) => {
  const handshakeSchema = z.object({
    userId: z.string(),
    playgroundId: z.string(),
    EIO: z.string(),
    transport: z.string(),
  });

  const q = socket.handshake.query;
  const parseQuery = handshakeSchema.safeParse(q);

  console.log(
    `Incoming connection attempt from socket ID: ${socket.id}, IP: ${socket.handshake.address}, Query Params:`,
    q
  );

  if (!parseQuery.success) {
    next(new Error("Invalid request."));
    return;
  }

  const { playgroundId, userId } = parseQuery.data;

  const dbUser = await fetch(
    `${process.env.DATABASE_WORKER_URL}/api/user?id=${userId}`,
    {
      headers: {
        Authorization: `${process.env.WORKERS_KEY}`,
      },
    }
  );
  const dbUserJSON = (await dbUser.json()) as User;

  if (!dbUserJSON) {
    next(new Error("DB error."));
    return;
  }

  const sandbox = dbUserJSON.playground.find((s) => s.id === playgroundId);

  if (!sandbox) {
    next(new Error("Invalid credentials."));
    return;
  }

  socket.data = {
    userId,
    playgroundId: playgroundId,
    isOwner: sandbox !== undefined,
  };

  next();
});

const lockManager = new LockManager();

// "io.on" is used to set up event listeners that respond to
// various events emitted by the client or server after the
// connection is successfully established. This is where you
// define the behavior of your application when specific events occur.
io.on("connection", async (socket) => {
  console.log(`New connection: ${socket.id}`); // Add logging

  try {
    if (inactivityTimeout) clearTimeout(inactivityTimeout);

    const data = socket.data as {
      userId: string;
      playgroundId: string;
      isOwner: boolean;
    };

    if (data.isOwner) {
      isOwnerConnected = true;
      connections[data.playgroundId] =
        (connections[data.playgroundId] ?? 0) + 1;
    } else {
      if (!isOwnerConnected) {
        socket.emit("disableAccess", "The sandbox owner is not connected.");
        return;
      }
    }

    const playgroundData = await getPlaygroundFiles(data.playgroundId);

    console.log(playgroundData.filesData);

    socket.emit("playgroundLoaded", {
      files: playgroundData.files,
      filesData: playgroundData.filesData,
      problemStatement: playgroundData.problemStatement,
    });

    // todo: send diffs + debounce for efficiency
    socket.on("saveFile", async (fileId: string, body: string) => {
      if (!fileId) return; // handles saving when no file is open

      try {
        if (Buffer.byteLength(body, "utf-8") > MAX_BODY_SIZE) {
          socket.emit(
            "error",
            "Error: file size too large. Please reduce the file size."
          );
          return;
        }
        try {
          await saveFileRL.consume(data.userId, 1);
          await saveFile(fileId, body);
        } catch (e) {
          io.emit("error", "Rate limited: file saving. Please slow down.");
          return;
        }

        const file = playgroundData.filesData.find((f) => f.id === fileId);
        if (!file) return;
        file.data = body;
      } catch (e: any) {
        console.error("Error saving file:", e);
        io.emit("error", `Error: file saving. ${e.message ?? e}`);
      }
    });

    // socket.on("getFile", (fileId: string, callback) => {
    //   console.log(fileId);
    //   try {
    //     const file = playgroundFiles.fileData.find((f) => f.id === fileId);
    //     if (!file) return;

    //     callback(file.data);
    //   } catch (e: any) {
    //     console.error("Error getting file:", e);
    //     io.emit("error", `Error: get file. ${e.message ?? e}`);
    //   }
    // });

    // socket.on("getFolder", async (folderId: string, callback) => {
    //   try {
    //     //
    //   } catch (e: any) {
    //     console.error("Error getting folder:", e);
    //     io.emit("error", `Error: get folder. ${e.message ?? e}`);
    //   }
    // });

    // socket.on(
    //   "moveFile",
    //   async (fileId: string, folderId: string, callback) => {
    //     try {
    //       //
    //     } catch (e: any) {
    //       console.error("Error moving file:", e);
    //       io.emit("error", `Error: file moving. ${e.message ?? e}`);
    //     }
    //   }
    // );

    // socket.on("createFile", async (name: string, callback) => {
    //   try {
    //     //
    //   } catch (e: any) {
    //     console.error("Error creating file:", e);
    //     io.emit("error", `Error: file creation. ${e.message ?? e}`);
    //   }
    // });

    // socket.on("createFolder", async (name: string, callback) => {
    //   try {
    //     //
    //   } catch (e: any) {
    //     console.error("Error creating folder:", e);
    //     io.emit("error", `Error: folder creation. ${e.message ?? e}`);
    //   }
    // });

    // socket.on("renameFile", async (fileId: string, newName: string) => {
    //   try {
    //     //
    //   } catch (e: any) {
    //     console.error("Error renaming folder:", e);
    //     io.emit("error", `Error: folder renaming. ${e.message ?? e}`);
    //   }
    // });

    // socket.on("deleteFile", async (fileId: string, callback) => {
    //   try {
    //     //
    //   } catch (e: any) {
    //     console.error("Error deleting file:", e);
    //     io.emit("error", `Error: file deletion. ${e.message ?? e}`);
    //   }
    // });

    // // todo
    // // socket.on("renameFolder", async (folderId: string, newName: string) => {
    // // });

    // socket.on("deleteFolder", async (folderId: string, callback) => {
    //   try {
    //     //
    //   } catch (e: any) {
    //     console.error("Error deleting folder:", e);
    //     io.emit("error", `Error: folder deletion. ${e.message ?? e}`);
    //   }
    // });

    socket.on("disconnect", async () => {
      try {
        if (data.isOwner) {
          connections[data.playgroundId]--;
        }

        if (data.isOwner && connections[data.playgroundId] <= 0) {
          //   await Promise.all(
          //     Object.entries(terminals).map(async ([key, terminal]) => {
          //       await terminal.kill();
          //       delete terminals[key];
          //     })
          //   );
          //   await lockManager.acquireLock(data.playgroundId, async () => {
          //     try {
          //       if (containers[data.playgroundId]) {
          //         await containers[data.playgroundId].close();
          //         delete containers[data.playgroundId];
          //         console.log("Closed container", data.playgroundId);
          //       }
          //     } catch (error) {
          //       console.error(
          //         "Error closing container ",
          //         data.playgroundId,
          //         error
          //       );
          //     }
          //   });
          //   socket.broadcast.emit(
          //     "disableAccess",
          //     "The sandbox owner has disconnected."
          //   );
        }

        // const sockets = await io.fetchSockets();
        // if (inactivityTimeout) {
        //   clearTimeout(inactivityTimeout);
        // }
        // if (sockets.length === 0) {
        //   console.log("STARTING TIMER");
        //   inactivityTimeout = setTimeout(() => {
        //     io.fetchSockets().then(async (sockets) => {
        //       if (sockets.length === 0) {
        //         console.log("Server stopped", res);
        //       }
        //     });
        //   }, 20000);
        // } else {
        //   console.log("number of sockets", sockets.length);
        // }
      } catch (e: any) {
        console.log("Error disconnecting:", e);
        io.emit("error", `Error: disconnecting. ${e.message ?? e}`);
      }
    });
  } catch (e: any) {
    console.error("Error connecting:", e);
    io.emit("error", `Error: connection. ${e.message ?? e}`);
  }
});

httpServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
