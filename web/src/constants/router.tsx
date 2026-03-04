import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import NotFound from "../pages/NotFound";
import Layout from "../layouts/Layout";
import RoomPage from "../pages/RoomPage";

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
                path: "/rooms/:id",
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
};
