import { useEffect } from "react";
import { io } from "socket.io-client";
import { useSocketStore } from "../store/socket.store";

export const useSocket = () => {
    const { socket, setSocket } = useSocketStore();
    useEffect(() => {
        if (socket) return;
        const newSocket = io("http://localhost:3000");
        setSocket(newSocket);
        newSocket.on("connect", () => {
            console.log("Connected to server");
        });
        newSocket.on("disconnect", () => {
            console.log("Disconnected from server");
        });
        return () => {
            newSocket.disconnect();
            setSocket(null);
        };
    }, [setSocket, socket]);
};
