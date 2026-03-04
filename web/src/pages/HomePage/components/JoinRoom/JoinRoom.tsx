import { Video, ArrowRight } from "lucide-react";
import React from "react";
import { useRoomStore } from "../../../../store/room.store";

const JoinRoom = () => {
    const { roomId, setRoomId } = useRoomStore();
    const handleJoinRoom = () => {
        console.log("Joining room:", roomId);
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
                    <input
                        id="roomInput"
                        type="text"
                        value={roomId}
                        onChange={handleInputChange}
                        placeholder="Enter room ID"
                        className="w-full bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all font-mono tracking-wider"
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
