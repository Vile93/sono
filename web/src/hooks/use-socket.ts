import { useEffect } from "react";
import { io } from "socket.io-client";
import { useSocketStore } from "../store/socket.store";

export const useSocket = () => {
    const { socket, setSocket, setSocketPayload } = useSocketStore();
    useEffect(() => {
        if (!socket) {
            const newSocket = io("http://localhost:3000");
            setSocket(newSocket);
            newSocket.on("connect", () => {
                console.log("Connected to server");
            });
            newSocket.onAny((event, ...args) => {
                /*  console.log("Received event:", event, "with data:", args); */
                setSocketPayload({ type: event, data: args[0] });
            });
            newSocket.on("disconnect", () => {
                console.log("Disconnected from server");
            });
        }
        return () => {
            if (socket) {
                socket.disconnect();
                setSocket(null);
            }
        };
    }, [setSocket, setSocketPayload, socket]);
};
