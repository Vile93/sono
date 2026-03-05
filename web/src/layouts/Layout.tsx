import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSocket } from "../hooks/use-socket";
import Settings from "../components/Settings/Settings";

const Layout = () => {
    useSocket();
    return (
        <>
            <ToastContainer
                position="top-right"
                toastClassName={(context) =>
                    `relative flex p-4 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer shadow-2xl mb-4 border whitespace-pre-wrap ${
                        context?.type === "error"
                            ? "bg-red-900/30 border-red-500/50 text-red-200"
                            : "bg-slate-800 border-slate-700 text-white"
                    }`
                }
                className="w-[320px]"
                closeButton={false}
            />
            <div className="p-4 flex flex-col min-h-dvh bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
                <Settings />
                <main className="flex-1 flex flex-col p-4 overflow-hidden">
                    <Outlet />
                </main>
            </div>
        </>
    );
};

export default Layout;
