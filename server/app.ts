import { Server } from "socket.io";

const io = new Server(3000, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

const generateRoomId = () => {
    const room = Math.random().toString(36).substring(2, 8).toUpperCase();
    if (io.sockets.adapter.rooms.has(room)) {
        return generateRoomId();
    }
    return room;
};

io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("createRoom", () => {
        const roomId = generateRoomId();
        socket.emit("roomCreated", roomId);
    });
    socket.on("joinRoom", (roomId) => {
        console.log("Joining room:", roomId);
        const isRoomExist = io.sockets.adapter.rooms.has(roomId);
        let count: number = io.sockets.adapter.rooms.get(roomId)?.size || 0;
        if (!isRoomExist) {
            socket.emit("roomNotFound", roomId);
            return;
        }
        if (count >= 2) {
            socket.emit("roomFull", roomId);
        }
        socket.join(roomId);
        socket.to(roomId).emit("userJoined", "A new user has joined the room.");
    });
    socket.on("disconnect", () => {
        io.sockets.adapter.rooms.forEach((room) => {
            if (room.has(socket.id)) {
                room.delete(socket.id);
            }
        });
        console.log("user disconnected");
    });
});

console.log("Socket.IO server running on port 3000");
