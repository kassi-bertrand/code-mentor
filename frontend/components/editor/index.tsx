// This component defines the "Playground". It is the place
// where the user sees their generated exercises, alongside
// the code editor
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import monaco from "monaco-editor";
import Editor, { BeforeMount, OnMount } from "@monaco-editor/react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Playground, TFile, TFolder, TTab, User } from "@/lib/types";
import { ImperativePanelHandle } from "react-resizable-panels";
import { CodeXml, Plus, Swords, Terminal } from "lucide-react";
import Button from "../ui/customButton";
import { Socket, io } from "socket.io-client";
import { useClerk } from "@clerk/nextjs";
import { debounce } from "@/lib/utils";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { executeCode } from "@/lib/actions";

export default function PlaygroundEditor({
  userData,
  playgroundData,
}: {
  userData: User;
  playgroundData: Playground;
}) {
  const socketRef = useRef<Socket | null>(null);

  // File states?
  const [problemStatement, setProblemStatement] = useState("");
  const [activeFileId, setActiveFileId] = useState<string>("");
  const [activeFileContent, setActiveFileContent] = useState("");
  const [files, setFiles] = useState<(TFolder | TFile)[]>([]);
  const [tabs, setTabs] = useState<TTab[]>([]);
  const [deletingFolderId, setDeletingFolderId] = useState("");

  // Monaco code editor state
  const [editorLanguage, setEditorLanguage] = useState(playgroundData.language);
  const [cursorLine, setCursorLine] = useState(0);
  const [editorRef, setEditorRef] =
    useState<monaco.editor.IStandaloneCodeEditor>();

  // Refs for libraries / features
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const monacoRef = useRef<typeof monaco | null>(null);

  // Pre-mount editor keybindings
  const handleEditorWillMount: BeforeMount = (monaco) => {
    monaco.editor.addKeybindingRules([
      {
        keybinding: monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyG,
        command: "null",
      },
    ]);
  };

  // Post-mount editor keybindings and actions
  const handleEditorMount: OnMount = (editor, monaco) => {
    setEditorRef(editor);
    monacoRef.current = monaco;

    editor.onDidChangeCursorPosition((e) => {
      const { column, lineNumber } = e.position;
      if (lineNumber === cursorLine) return;
      setCursorLine(lineNumber);

      const model = editor.getModel();
      const endColumn = model?.getLineContent(lineNumber).length || 0;
    });

    editor.onDidBlurEditorText((e) => {});
  };

  const getCurrentEditorContent = () => {
    if (editorRef) {
      return editorRef.getValue();
    }
    return ""; // or return activeFileContent as a fallback
  };

  // Set output state to update as the Run Code button is pressed
  const [output, setOutput] = useState<string[] | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  // To handle errors in code compilation
  const [isError, setIsError] = useState(false);

  const isOwner = playgroundData.userId === userData.id;
  const clerk = useClerk();

  // Handle Run Code button to see the output
  const runCode = async () => {
    const sourceCode = getCurrentEditorContent();
    // if there is no source code, return no output
    if (!sourceCode) return;
    // request to Piston API to fetch the output
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(editorLanguage, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
      // sends an error message to the output section if the API does not run
      // Toast from Chakra UI
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize a websocket connection if it doesn't exist
  useEffect(() => {
    socketRef.current = io(
      `${window.location.protocol}//${window.location.hostname}:${process.env.NEXT_PUBLIC_SERVER_PORT}?userId=${userData.id}&playgroundId=${playgroundData.id}`,
      {
        timeout: 2000,
      }
    );

    return () => {
      socketRef.current?.disconnect();
    };
  }, [userData.id, playgroundData.id]);

  // Connection/disconnection effect
  useEffect(() => {
    socketRef.current?.connect();

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  // Socket event listener effect
  useEffect(() => {
    const onConnect = () => {};

    const onDisconnect = () => {};

    const onLoadedEvent = (files: (TFolder | TFile)[]) => {
      setFiles(files);
    };

    const onError = (message: string) => {};

    const onDisableAccess = (message: string) => {
      if (!isOwner) {
        //
      }
    };

    const onPlaygroundLoaded = (data: {
      files: (TFolder | TFile)[];
      problemStatement: string;
      filesData: { id: string; data: string }[];
    }) => {
      setFiles(data.files);
      setProblemStatement(data.problemStatement);

      // Ensure fileData is defined and is an array
      if (Array.isArray(data.filesData)) {
        // Find the first file that is not 'challenge.md'
        const initialFileData = data.filesData.find(
          (file) => file.id && !file.id.endsWith("challenge.md")
        );

        if (initialFileData) {
          // Set the active file ID and content
          setActiveFileId(initialFileData.id);
          setActiveFileContent(initialFileData.data);
        }
      } else {
        console.warn("fileData is not available or not an array");
      }
    };

    socketRef.current?.on("connect", onConnect);
    socketRef.current?.on("disconnect", onDisconnect);
    socketRef.current?.on("loaded", onLoadedEvent);
    socketRef.current?.on("error", onError);
    socketRef.current?.on("disableAccess", onDisableAccess);
    socketRef.current?.on("playgroundLoaded", onPlaygroundLoaded);

    return () => {
      socketRef.current?.off("connect", onConnect);
      socketRef.current?.off("disconnect", onDisconnect);
      socketRef.current?.off("loaded", onLoadedEvent);
      socketRef.current?.off("error", onError);
      socketRef.current?.off("disableAccess", onDisableAccess);
      socketRef.current?.off("playgroundLoaded", onPlaygroundLoaded);
    };
  }, [isOwner]);

  // Save file keybinding logic effect
  const debouncedSaveData = useCallback(
    debounce((value: string | undefined, activeFileId: string | undefined) => {
      if (!activeFileId || value === undefined) {
        console.warn("Cannot save file. Missing activeFileId or file content.");
        return;
      }

      setTabs((prev) =>
        prev.map((tab) =>
          tab.id === activeFileId ? { ...tab, saved: true } : tab
        )
      );
      console.log(`Saving file...${activeFileId}`);
      console.log(`Saving file...${value}`);
      socketRef.current?.emit("saveFile", activeFileId, value, (response) => {
        // !NOTE: "response" has implicit "any" type. Address it.
        if (response.success) {
          // Show a save success message
          console.log("File saved successfully");
          // You could use a toast notification here
        } else {
          // Show an error message
          console.error("Failed to save file");
        }
      });
    }, Number(process.env.FILE_SAVE_DEBOUNCE_DELAY) || 1000),
    [socketRef]
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        debouncedSaveData(editorRef?.getValue(), activeFileId);
      }
    };
    document.addEventListener("keydown", down);

    return () => {
      document.removeEventListener("keydown", down);
    };
  }, [activeFileId, debouncedSaveData, editorRef, tabs]);

  return (
    <div className="h-screen w-screen overflow-auto bg-gray-200">
      <ResizablePanelGroup
        direction="horizontal"
        className="h-screen bg-gray-200"
      >
        <ResizablePanel defaultSize={50} className="bg-white m-1 rounded-md">
          <div className="bg-gray-50 p-1 flex justify-between items-center">
            <div className="flex divide-x divide-gray-300/50">
              <Button className="bg-transparent px-2 py-1 hover:bg-gray-200 ">
                <Swords className="mr-1 h-5 w-5" color="#3a88fe" /> Challenge
              </Button>

              <Button className="bg-transparent px-2 py-1 hover:bg-gray-200 ">
                <Plus className="h-5 w-5" color="#aaaaaa" />
              </Button>
            </div>
          </div>
          {/* Problem description panel */}

          <ReactMarkdown
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
            className="h-full p-4 overflow-auto prose prose-sm max-w-none"
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {problemStatement}
          </ReactMarkdown>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel
              defaultSize={75}
              minSize={30}
              className="bg-white m-1 rounded-md"
            >
              {/* Code editor panel */}
              <div className="h-full">
                <div className="bg-gray-50 p-1 flex justify-between items-center">
                  <Button className="bg-transparent px-2 py-1 hover:bg-gray-200 ">
                    <CodeXml className="mr-1 h-5 w-5" color="#02b028" /> Code
                  </Button>
                </div>
                <Editor
                  height="calc(100% - 40px)"
                  language={editorLanguage}
                  value={activeFileContent}
                  /*Can add default code snippets here */
                  // defaultValue= {CODE_SNIPPETS[language]}
                  beforeMount={handleEditorWillMount}
                  onMount={handleEditorMount}
                  options={{
                    tabSize: 4,
                    minimap: {
                      enabled: false,
                    },
                    padding: {
                      bottom: 4,
                      top: 4,
                    },
                    fontSize: 14,
                    scrollBeyondLastLine: false,
                    fixedOverflowWidgets: true,
                    fontFamily: "var(--font-geist-mono)",
                  }}
                />
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel
              defaultSize={25}
              className="bg-white m-1 rounded-md"
            >
              {/* Terminal panel */}
              <div className="h-full">
                <div className="bg-gray-50 p-1 flex justify-between items-center">
                  <Button
                    onClick={runCode}
                    className="bg-transparent px-2 py-1 hover:bg-gray-200"
                  >
                    <Terminal className="mr-1 h-5 w-5" color="#02b028" /> Run
                    Code
                  </Button>
                </div>
                <div className="h-full p-4 overflow-auto">
                  {output
                    ? output.map((line, i) => (
                        <div
                          key={i}
                          className={`${isError ? "text-red-500" : ""}`}
                        >
                          {line}
                        </div>
                      ))
                    : "Click 'Run Code' to see the output here!"}
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
