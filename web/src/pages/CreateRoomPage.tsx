import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import Checkbox from "../components/ui/Checkbox/Checkbox";
import Input from "../components/ui/Input/Input";
import { TRANSITION } from "../constants/transition";

const CreateRoomPage = () => {
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
        setIsVisibleTextPassword(false);
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
    const [isVisibleTextPassword, setIsVisibleTextPassword] = useState(false);
    const handleClickVisiblePassword = () => {
        setIsVisibleTextPassword((prev) => !prev);
    };
    return (
        <div className="px-4 mx-auto container">
            <h1 className="font-bold text-2xl">Sono</h1>
            <div className="mt-4">
                <div className="text-xl font-semibold">Create room</div>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="flex flex-col gap-2">
                        <div className="w-64">
                            <Input
                                type="text"
                                placeholder="Enter room name..."
                                className="mt-2"
                                value={form.name}
                                onChange={handleChangeNameForm}
                                maxLength={32}
                                required
                            />
                        </div>
                        <div className="w-64">
                            <Input
                                type={"password"}
                                isVisibleTextPassword={isVisibleTextPassword}
                                value={form.password}
                                onChange={handleChangePasswordForm}
                                maxLength={32}
                                disabled={!form.withPassword}
                                required={form.withPassword}
                                handleClickVisiblePassword={handleClickVisiblePassword}
                            />
                        </div>
                        <div className="flex gap-4">
                            <div className="inline-flex items-center gap-2">
                                <label htmlFor="check">
                                    <p className="text-sm text-gray-500 select-none">Password</p>
                                </label>
                                <Checkbox
                                    id="check"
                                    checked={form.withPassword}
                                    onChange={handleChangeWithPassword}
                                />
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
};

export default CreateRoomPage;
