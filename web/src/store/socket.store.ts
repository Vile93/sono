import type { Socket } from "socket.io-client";
import { create } from "zustand";

type SocketStore = {
    socketPayload: {
        type: "roomCreated" | "roomNotFound" | "roomFull" | "userJoined";
        data: string;
    } | null;
    setSocketPayload: (payload: SocketStore["socketPayload"]) => void;
    socket: Socket | null;
    setSocket: (socket: Socket | null) => void;
};

export const useSocketStore = create<SocketStore>((set) => ({
    socket: null,
    socketPayload: null,
    setSocketPayload: (payload) => set({ socketPayload: payload }),
    setSocket: (socket) => set({ socket }),
}));
