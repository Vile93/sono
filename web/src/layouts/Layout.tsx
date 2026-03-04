import { Outlet } from "react-router-dom";
import { useSocket } from "../hooks/use-socket";

const Layout = () => {
    useSocket();
    return (
        <div className="p-4 flex flex-col min-h-dvh bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
            <Outlet />
        </div>
    );
};

export default Layout;
