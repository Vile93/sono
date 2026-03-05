import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import NotFound from "../pages/NotFound";
import Layout from "../layouts/Layout";
import RoomPage from "../pages/RoomPage/RoomPage";
import RoomFinishPage from "../pages/RoomFinishPage/RoomFinishPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "/rooms/finish",
                element: <RoomFinishPage />,
            },
            {
                path: "/rooms/:roomId",
                element: <RoomPage />,
            },

            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
]);

export const ROUTES = {
    HOME: "/",
    ROOM: (id: string) => `/rooms/${id}`,
    ROOM_FINISH: "/rooms/finish",
};
