import { Globe, Server, User, X } from "lucide-react";
import { useSettingsStore } from "../../../../store/settings.store";
import Input from "../../../ui/Input/Input";
import Select from "../../../ui/Select/Select";

const SettingsModal = () => {
    const { settings, setSettings, hideSettings } = useSettingsStore();
    const handleChange = (key: keyof typeof settings, value: string) => {
        const updated = { ...settings, [key]: value };
        setSettings(updated);
    };
    return (
        <div>
            <div
                className="fixed bg-black/50 backdrop-blur-sm z-40 inset-0"
                onClick={hideSettings}
            ></div>
            <div className="w-120 fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 flex items-center justify-center z-50 p-4">
                <div className="bg-linear-to-br from-slate-800 to-slate-900 rounded-2xl border border-white/10 w-full max-w-md shadow-2xl">
                    <div className="flex items-center justify-between p-6 border-b border-white/10">
                        <h2 className="text-xl font-bold text-white">Settings</h2>
                        <button
                            onClick={hideSettings}
                            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5 text-slate-400" />
                        </button>
                    </div>

                    <div className="p-6 space-y-6">
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                                <Globe className="w-4 h-4" />
                                Language
                            </label>
                            <Select
                                value={settings.language}
                                onChange={(e) => handleChange("language", String(e.target.value))}
                                options={[
                                    { label: "English", value: "en" },
                                    { label: "Беларуская", value: "by" },
                                    { label: "Русский", value: "ru" },
                                ]}
                            />
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                                <User className="w-4 h-4" />
                                Username
                            </label>
                            <Input
                                type="text"
                                value={settings.username}
                                maxLength={32}
                                onChange={(e) => handleChange("username", e.target.value)}
                                placeholder="Enter your name"
                            />
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                                <Server className="w-4 h-4" />
                                Preferred Server
                            </label>
                            <Input
                                type="text"
                                value={settings.server}
                                onChange={(e) => handleChange("server", e.target.value)}
                                placeholder="e.g., stun:stun.example.com:3478"
                            />
                            <p className="text-xs text-slate-500 mt-2">
                                Optional STUN/TURN server configuration
                            </p>
                        </div>

                        <div className="pt-4 border-t border-white/10 flex gap-3">
                            <button
                                onClick={hideSettings}
                                className="flex-1 px-4 py-2 bg-linear-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white rounded-lg transition-colors font-medium"
                            >
                                Save & Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;
