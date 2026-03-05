import React from "react";

type SelectProps = {
    options: { value: string; label: string }[];
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const Select = ({ options, ...rest }: SelectProps) => {
    return (
        <div className="w-full">
            <div className="relative">
                <select
                    className="w-full bg-slate-900/50 border border-white/20 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all appearance-none"
                    {...rest}
                >
                    {options.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                            className="bg-slate-900 text-white"
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.2"
                    stroke="currentColor"
                    className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                </svg>
            </div>
        </div>
    );
};

export default Select;
