import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { TRANSITION } from "./constants/transition";

function App() {
    const [url, setUrl] = useState("");
    const handleCreateRoom = () => {
        if (!form.name) {
            setForm((prev) => ({ ...prev, name: "" }));
            return;
        }
        setUrl(`${location.href}rooms/${form.name}`);
    };
    const handleChangeNameForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, name: e.target.value }));
    };
    const handleChangeWithPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, withPassword: e.target.checked }));
    };
    const handleChangePasswordForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, password: e.target.value }));
    };
    const [form, setForm] = useState({
        name: "",
        password: "",
        withPassword: false,
    });
    const isValid = form.name && (!form.withPassword || (form.withPassword && form.password));

    return (
        <div className="px-4 mx-auto container">
            <h1 className="font-bold text-2xl">Sono</h1>
            <div className="mt-4">
                <div className="text-xl font-semibold">Create room</div>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="flex flex-col gap-2">
                        <div>
                            <input
                                type="text"
                                placeholder="Enter room name..."
                                className="border border-gray-300 rounded px-3 py-2 mt-2"
                                value={form.name}
                                onChange={handleChangeNameForm}
                                maxLength={32}
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Enter password..."
                                className="border border-gray-300 rounded px-3 py-2"
                                value={form.password}
                                onChange={handleChangePasswordForm}
                                maxLength={32}
                                disabled={!form.withPassword}
                                required={form.withPassword}
                            />
                        </div>
                        <div className="flex gap-4">
                            <div className="inline-flex items-center gap-2">
                                <label htmlFor="check">
                                    <p className="text-sm text-gray-500 select-none">Password</p>
                                </label>
                                <label className="flex items-center cursor-pointer relative">
                                    <input
                                        type="checkbox"
                                        className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
                                        id="check"
                                        checked={form.withPassword}
                                        onChange={handleChangeWithPassword}
                                    />
                                    <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-3.5 w-3.5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            stroke="currentColor"
                                            strokeWidth="1"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                                onClick={handleCreateRoom}
                                disabled={!isValid}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="mt-4">
                <AnimatePresence>
                    {url && (
                        <>
                            <div className="text-lg font-semibold">Room URL:</div>
                            <motion.a
                                className="text-blue-500"
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                transition={TRANSITION.A.transition}
                                initial={TRANSITION.A.initial}
                                animate={TRANSITION.A.animate}
                                exit={TRANSITION.A.exit}
                            >
                                {url}
                            </motion.a>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default App;
