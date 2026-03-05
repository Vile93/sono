import { create } from "zustand";

type RtcStore = {
    audio: HTMLAudioElement | null;
    setAudio: (audio: HTMLAudioElement | null) => void;
};

export const useRtcStore = create<RtcStore>((set) => ({
    audio: null,
    setAudio: (audio) => set({ audio }),
}));
