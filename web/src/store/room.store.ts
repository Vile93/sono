import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE } from "../constants/storage";

type RoomStore = {
    roomId: string;
    setRoomId: (roomId: string) => void;
};

export const useRoomStore = create<RoomStore>()(
    persist(
        (set) => ({
            roomId: "",
            setRoomId: (roomId) => set({ roomId }),
        }),
        {
            name: STORAGE.ROOM,
        },
    ),
);
