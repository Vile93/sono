import { Server } from "socket.io";
import { createServer } from "http";

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
const openRooms = new Map<string, Set<string>>();

const generateRoomId = () => {
    const room = Math.random().toString(36).substring(2, 8).toUpperCase();
    if (openRooms.has(room)) {
        return generateRoomId();
    }
    return room;
};

io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("createRoom", () => {
        const roomId = generateRoomId();
        openRooms.set(roomId, new Set());
        socket.emit("roomCreated", roomId);
    });
    socket.on("roomCheck", (roomId) => {
        console.log("Checking room", roomId);
        console.log("Room is: ", io.sockets.adapter.rooms.has(roomId));
        if (openRooms.has(roomId)) {
            openRooms.get(roomId)?.add(socket.id);
            socket.join(roomId);
        }
        socket.emit("roomExists", openRooms.has(roomId));
    });
    socket.on("roomData", (roomId) => {
        console.log("Fetching room data for:", roomId);
        const roomData = openRooms.get(roomId);
        if (roomData) {
            socket.emit("roomData", {
                roomId,
                users: roomData.size,
            });
        } else {
            socket.emit("roomNotFound", roomId);
        }
    });
    socket.on("joinRoom", (roomId) => {
        console.log("Joining room:", roomId);
        const roomData = openRooms.get(roomId);
        if (!roomData) {
            socket.emit("roomNotFound", roomId);
            return;
        }
        if (roomData.size >= 2) {
            socket.emit("roomFull", roomId);
        }
        roomData.add(socket.id);
        socket.join(roomId);
        socket.emit("joinedRoom", roomId);
        socket.to(roomId).emit("userJoined", "A new user has joined the room.");
    });
    socket.on("exitRoom", (roomId) => {
        console.log("Exiting room:", roomId);
        const roomData = openRooms.get(roomId);
        socket.leave(roomId);
        if (roomData) {
            roomData.delete(socket.id);
        }
        socket.to(roomId).emit("userExited", "A user has left the room.");
        socket.emit("roomExited", roomId);
    });

    socket.on("offer", (offer) => {
        const rooms = Array.from(socket.rooms).filter((r) => r !== socket.id);
        for (const room of rooms) {
            socket.to(room).emit("offer", offer);
        }
    });
    socket.on("candidate", (candidate) => {
        const rooms = Array.from(socket.rooms).filter((r) => r !== socket.id);
        for (const room of rooms) {
            socket.to(room).emit("candidate", candidate);
        }
    });
    socket.on("answer", (answer) => {
        const rooms = Array.from(socket.rooms).filter((r) => r !== socket.id);
        for (const room of rooms) {
            socket.to(room).emit("answer", answer);
        }
    });

    socket.on("disconnect", () => {
        io.sockets.adapter.rooms.forEach((room) => {
            if (room.has(socket.id)) {
                room.delete(socket.id);
            }
            for (const [roomId, roomData] of openRooms.entries()) {
                if (roomData.has(socket.id)) {
                    roomData.delete(socket.id);
                    if (roomData.size === 0) {
                        openRooms.delete(roomId);
                    }
                }
            }
        });
        console.log("user disconnected");
    });
});

httpServer.listen(3001, "0.0.0.0", () => {
    console.log("Socket.IO server running on port 3001");
});
