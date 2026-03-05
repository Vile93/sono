import { ArrowRight, CheckCircle2, Copy, Users } from "lucide-react";
import { useState } from "react";
import { useCopy } from "../../../../hooks/use-copy";
import { useRoomStore } from "../../../../store/room.store";
import { useSocketStore } from "../../../../store/socket.store";

const CreateRoom = () => {
    const { setRoomId } = useRoomStore();
    const [createdRoomId, setCreatedRoomId] = useState<string | null>(null);
    const { socket } = useSocketStore();
    const { copyToClipboard, isCopied } = useCopy();
    const handleCreateRoom = () => {
        if (socket) {
            socket.once("roomCreated", (newRoomId: string) => {
                setRoomId(newRoomId);
                setCreatedRoomId(newRoomId);
            });
            socket.emit("createRoom");
        }
    };
    return (
        <div className="flex flex-col justify-between bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
            <div>
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Create Room</h2>
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">
                    Start a new video call room and invite others to join using a unique room ID.
                </p>
            </div>

            {createdRoomId && (
                <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex-1">
                            <p className="text-xs text-slate-400 mb-1">Room ID</p>
                            <p className="text-lg font-mono font-bold text-white tracking-wider">
                                {createdRoomId}
                            </p>
                        </div>
                        <button
                            onClick={() => copyToClipboard(createdRoomId)}
                            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                            title="Copy to clipboard"
                        >
                            {isCopied ? (
                                <CheckCircle2 className="w-5 h-5 text-green-400" />
                            ) : (
                                <Copy className="w-5 h-5 text-slate-400" />
                            )}
                        </button>
                    </div>
                </div>
            )}

            <button onClick={handleCreateRoom} className="primary">
                Create New Room
                <ArrowRight className="w-5 h-5" />
            </button>
        </div>
    );
};

export default CreateRoom;
