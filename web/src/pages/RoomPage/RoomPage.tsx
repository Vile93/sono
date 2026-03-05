import { CheckCircle2, Copy, Mic, MicOff, Phone, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Audio from "../../components/Audio/Audio";
import Loader from "../../components/Loader/Loader";
import StatusPage from "../../components/StatusPage/StatusPage";
import { ROUTES } from "../../constants/router";
import { useCopy } from "../../hooks/use-copy";
import { useRtcStore } from "../../store/rtc.store";
import { useSocketStore } from "../../store/socket.store";
import Client from "./components/Client";
import { useSettingsStore } from "../../store/settings.store";

const RoomPage = () => {
    const { settings } = useSettingsStore();
    const { socket } = useSocketStore();
    const [isLoading, setIsLoading] = useState(true);
    const [isRoomExist, setIsRoomExist] = useState(false);
    const { roomId } = useParams();
    const { copyToClipboard, isCopied } = useCopy();
    const navigate = useNavigate();
    const [isMuted, setIsMuted] = useState(true);
    const [peerName, setPeerName] = useState<string>("");
    const pcRef = useRef<RTCPeerConnection | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const { audio } = useRtcStore();
    const clearRtc = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
        }
        if (pcRef.current) {
            pcRef.current.close();
        }
        if (socket) {
            socket.off("candidate");
            socket.off("answer");
            socket.off("offer");
            socket.off("roomData");
        }
    };
    const handleMuteToggle = () => {
        setIsMuted((prev) => !prev);
        if (!streamRef.current) return;
        const isCurrentMuted = !isMuted;
        if (isCurrentMuted) {
            streamRef.current?.getAudioTracks().forEach((track) => (track.enabled = false));
        } else {
            streamRef.current?.getAudioTracks().forEach((track) => (track.enabled = true));
        }
    };

    const handleExit = () => {
        if (socket) {
            socket.once("roomExited", () => {
                navigate(ROUTES.ROOM_FINISH, {
                    state: {
                        reason: "user_left",
                    },
                });
            });
            socket.emit("exitRoom", roomId);
        }
    };
    useEffect(() => {
        if (socket) {
            socket.once("roomExists", (isRoomExist: boolean) => {
                setIsLoading(false);
                setIsRoomExist(isRoomExist);
            });
            socket.emit("roomCheck", roomId);
        }
    }, [roomId, socket]);
    useEffect(() => {
        const initializeConnection = async () => {
            if (socket && audio) {
                const pc = new RTCPeerConnection();
                pcRef.current = pc;
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: {
                        echoCancellation: true,
                        noiseSuppression: true,
                        autoGainControl: true,
                    },
                });
                stream.getTracks().forEach((track) => pc.addTrack(track, stream));
                streamRef.current = stream;
                pc.onicecandidate = (event) => {
                    if (event.candidate && socket) {
                        socket.emit("candidate", event.candidate);
                    }
                };
                pc.ontrack = async (event) => {
                    const remoteStream = event.streams[0];
                    if (audio) {
                        audio.srcObject = remoteStream;
                        await audio.play();
                    }
                };
                const channel = pc.createDataChannel("chat");
                channel.onmessage = (event) => {
                    const message = JSON.parse(event.data);
                    if (message.type === "settings") {
                        setPeerName(message.username || "Anonymous");
                    }
                };
                pc.ondatachannel = (event) => {
                    const receiveChannel = event.channel;
                    receiveChannel.onopen = () => {
                        receiveChannel.send(
                            JSON.stringify({
                                type: "settings",
                                username: settings.username,
                            }),
                        );
                    };
                    receiveChannel.onmessage = (event) => {
                        const message = JSON.parse(event.data);
                        if (message.type === "settings") {
                            setPeerName(message.username || "Anonymous");
                        }
                    };
                };

                socket.once("roomData", async ({ users }) => {
                    if (users >= 2) {
                        const channel = pc.createDataChannel("chat");
                        channel.onmessage = (event) => {
                            const message = JSON.parse(event.data);
                            if (message.type === "settings") {
                                setPeerName(message.username || "Anonymous");
                            }
                        };
                        channel.onopen = () => {
                            channel.send(
                                JSON.stringify({
                                    type: "settings",
                                    username: settings.username,
                                }),
                            );
                        };
                        const offer = await pc.createOffer();
                        await pc.setLocalDescription(offer);
                        socket.emit("offer", offer);
                    }
                });
                socket.emit("roomData", roomId);
                socket.on("candidate", async (candidate: RTCIceCandidateInit) => {
                    if (pc.remoteDescription && candidate) {
                        await pc.addIceCandidate(candidate);
                    }
                });
                socket.on("answer", async (answer: RTCSessionDescriptionInit) => {
                    console.log("Received answer:", answer);
                    await pc.setRemoteDescription(answer);
                });
                socket.on("offer", async (offer: RTCSessionDescriptionInit) => {
                    await pc.setRemoteDescription(offer);
                    const answer = await pc.createAnswer();
                    await pc.setLocalDescription(answer);
                    socket.emit("answer", answer);
                });
                pc.onconnectionstatechange = () => {
                    console.log("state", pc.connectionState);
                    if (pc.connectionState === "disconnected" || pc.connectionState === "failed") {
                        clearRtc();
                        initializeConnection();
                        console.log("reconnect");
                    }
                };
            }
        };
        initializeConnection();
        return () => {
            clearRtc();
        };
    }, [audio]);
    if (isLoading) {
        return <Loader />;
    }
    if (!isRoomExist) {
        return (
            <StatusPage title="404" description="The room you are looking for does not exist." />
        );
    }
    return (
        <div className="flex flex-1 w-full overflow-hidden">
            <Audio />
            <div className="flex-1 flex flex-col">
                <div className="flex-1 flex flex-col justify-between gap-4 p-6 overflow-hidden">
                    <div className=" flex-1 flex flex-col md:flex-row gap-4">
                        <Client
                            icon={<User className="w-12 h-12 text-blue-400" />}
                            name={`${settings.username}`}
                        />
                        <Client
                            icon={<User className="w-12 h-12 text-cyan-400" />}
                            name={`${peerName}` || "Anonymous"}
                        />
                    </div>
                </div>

                <div className="bg-linear-to-t from-slate-900 via-slate-900 to-transparent border-t border-white/10 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                            <span className="text-sm text-slate-300">Room ID:</span>
                            <code className="font-mono font-bold text-white text-sm">{roomId}</code>
                            <button
                                onClick={() => copyToClipboard(roomId || "")}
                                className="ml-2 p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                                title="Copy room ID"
                            >
                                {isCopied ? (
                                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                                ) : (
                                    <Copy className="w-5 h-5 text-slate-400" />
                                )}
                            </button>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleMuteToggle}
                                className={`p-3 rounded-full transition-all duration-200 ${
                                    isMuted
                                        ? "bg-red-500/20 border border-red-500/50 hover:bg-red-500/30"
                                        : "bg-white/10 border border-white/20 hover:bg-white/20"
                                }`}
                                title={isMuted ? "Unmute" : "Mute"}
                            >
                                {isMuted ? (
                                    <MicOff className="w-5 h-5 text-red-400" />
                                ) : (
                                    <Mic className="w-5 h-5 text-white" />
                                )}
                            </button>

                            <button
                                className="p-3 rounded-full bg-red-500/20 border border-red-500/50 hover:bg-red-500/30 transition-all duration-200"
                                title="End call"
                                onClick={handleExit}
                            >
                                <Phone className="w-5 h-5 text-red-400 rotate-135" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomPage;
