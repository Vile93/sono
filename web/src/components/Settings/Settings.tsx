import { Settings as SettingsIcon } from "lucide-react";
import { useSettingsStore } from "../../store/settings.store";
import SettingsModal from "./components/SettingsModal/SettingsModal";

const Settings = () => {
    const { showSettings, isSettingsOpen } = useSettingsStore();

    return (
        <>
            <button
                onClick={showSettings}
                className="absolute top-4 left-4 z-40 p-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all duration-200"
                title="Settings"
            >
                <SettingsIcon className="w-5 h-5 text-white" />
            </button>
            {isSettingsOpen && <SettingsModal />}
        </>
    );
};

export default Settings;
