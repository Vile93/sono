import type { Socket } from "socket.io-client";
import { create } from "zustand";

type SocketStore = {
    socket: Socket | null;
    setSocket: (socket: Socket | null) => void;
};

export const useSocketStore = create<SocketStore>((set) => ({
    socket: null,
    setSocket: (socket) => set({ socket }),
}));
