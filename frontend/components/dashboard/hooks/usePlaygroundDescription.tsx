import { TFile, TFolder } from '@/lib/types';
import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

export function usePlaygroundDescription(playgroundId: string, userId: string) {
  const [description, setDescription] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(
      `${window.location.protocol}//${window.location.hostname}:${process.env.NEXT_PUBLIC_SERVER_PORT}?userId=${userId}&playgroundId=${playgroundId}`,
      {
        timeout: 2000,
      }
    );

    newSocket.on('connect', () => {
      console.log("Dashboard is connected to the playground")
    });

    newSocket.on('playgroundLoaded', (data: {
      files: (TFolder | TFile)[];
      problemStatement: string;
      filesData: { id: string; data: string }[];
    }) => {
      setDescription(data.problemStatement);
    });

    newSocket.on('error', (message: string) => {
      console.error('Websocket error:', message);
    });

    setSocket(newSocket);

    return () => {
      console.log('Disconnecting the socket...');
      newSocket.disconnect();
    };
  }, [playgroundId, userId]);

  return { description, socket };
}