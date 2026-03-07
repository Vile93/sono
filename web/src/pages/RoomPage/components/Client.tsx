import React, { forwardRef } from "react";

type Props = {
    icon: React.ReactNode;
    name: string;
};

const Client = forwardRef<HTMLDivElement, Props>(({ icon, name }, ref) => {
    return (
        <div
            ref={ref}
            className={`flex-1 bg-linear-to-br from-slate-800 to-slate-900 rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center group relative`}
        >
            <div className="absolute inset-0 bg-linear-to-b from-slate-700/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex flex-col items-center gap-4 text-center px-8">
                <div className="w-24 h-24 bg-linear-to-br from-cyan-500/20 to-teal-500/20 rounded-full flex items-center justify-center border border-cyan-500/30">
                    {icon}
                </div>
                <div>
                    <p className="text-xl font-semibold text-white mb-1">{name}</p>
                </div>
            </div>
        </div>
    );
});

export default Client;
