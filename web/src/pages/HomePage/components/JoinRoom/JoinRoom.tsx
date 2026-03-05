import { ArrowRight, Video } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ROUTES } from "../../../../constants/router";
import { useRoomStore } from "../../../../store/room.store";
import { useSocketStore } from "../../../../store/socket.store";
import Input from "../../../../components/ui/Input/Input";

const JoinRoom = () => {
    const { roomId, setRoomId } = useRoomStore();
    const { socket } = useSocketStore();
    const navigate = useNavigate();
    const handleJoinRoom = () => {
        if (socket) {
            const onRoomNotFound = () => {
                toast("Room not found.\nPlease check the room code and try again.", {
                    type: "error",
                });
            };
            const onJoined = () => {
                socket.off("roomNotFound", onRoomNotFound);
                navigate(ROUTES.ROOM(roomId));
            };
            socket.once("userJoined", onJoined);
            socket.once("roomNotFound", onRoomNotFound);
            socket.emit("joinRoom", roomId);
        }
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRoomId(e.target.value.toUpperCase());
    };

    return (
        <div className="flex flex-col justify-between bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10">
            <div>
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-linear-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center">
                        <Video className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Join Room</h2>
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">
                    Enter a room ID to join an existing video call and connect with others.
                </p>
                <div>
                    <label
                        htmlFor="roomInput"
                        className="block text-sm font-medium text-slate-300 mb-2"
                    >
                        Room ID
                    </label>
                    <Input
                        id="roomInput"
                        type="text"
                        value={roomId}
                        onChange={handleInputChange}
                        placeholder="Enter room ID"
                    />
                </div>
            </div>
            <button className="primary" onClick={handleJoinRoom} disabled={!roomId.trim()}>
                Join Room
                <ArrowRight className="w-5 h-5" />
            </button>
        </div>
    );
};

export default JoinRoom;
