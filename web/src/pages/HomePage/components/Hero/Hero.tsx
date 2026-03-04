import { Video } from "lucide-react";

const Hero = () => {
    return (
        <div className="relative flex flex-col items-center justify-center px-4 py-8">
            <div className="max-w-6xl w-full">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-blue-500 to-cyan-500 rounded-2xl mb-6 shadow-2xl shadow-blue-500/20">
                        <Video className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                        WebRTC P2P Calls
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        Secure peer-to-peer video conversations with no intermediary servers. Create
                        or join a room to start connecting instantly.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Hero;
