import { createBrowserRouter } from "react-router-dom";
import CreateRoomPage from "../pages/CreateRoomPage";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <CreateRoomPage />,
    },
    {
        path: "/rooms/:id",
        element: <div>Room</div>,
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export const ROUTES = {
    HOME: "/",
    ROOM: (id: string) => `/rooms/${id}`,
};
