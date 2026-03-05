type Props = {} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ className, ...props }: Props) => {
    return (
        <input
            className={`w-full bg-slate-900/50 border border-white/20 text-white placeholder-slate-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all ${className}`}
            {...props}
        />
    );
};
export default Input;
