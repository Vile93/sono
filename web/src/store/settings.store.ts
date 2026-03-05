import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserSettings = {
    language: string;
    username: string;
    server: string;
};

export type SettingsStore = {
    settings: UserSettings;
    setSettings: (settings: UserSettings) => void;
    isSettingsOpen: boolean;
    showSettings: () => void;
    hideSettings: () => void;
};

export const useSettingsStore = create<SettingsStore>()(
    persist(
        (set) => ({
            settings: {
                language: "en",
                username: "Anonymous",
                server: "",
            },
            setSettings: (settings) => set({ settings }),
            isSettingsOpen: false,
            showSettings: () => set({ isSettingsOpen: true }),
            hideSettings: () => set({ isSettingsOpen: false }),
        }),
        {
            name: "settings",
        },
    ),
);
