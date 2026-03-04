import { Eye, EyeOff } from "lucide-react";
import styles from "./Input.module.css";

type Props = {
    isVisibleTextPassword?: boolean;
    handleClickVisiblePassword?: () => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({
    isVisibleTextPassword,
    className,
    type,
    handleClickVisiblePassword,
    ...props
}: Props) => {
    const isPasswordType = type === "password";
    return (
        <div className="relative">
            <input
                type={isVisibleTextPassword ? "text" : type}
                placeholder="Enter password..."
                className={`${styles.input} w-full peer border border-gray-300 rounded pl-3 py-2 pr-12 ${className}`}
                {...props}
            />
            {isPasswordType && (
                <div className="absolute top-1/2 right-4 -translate-y-1/2">
                    {isVisibleTextPassword ? (
                        <Eye
                            className={`${styles.icon} text-gray-500 cursor-pointer peer-disabled:opacity-50 select-none`}
                            onClick={handleClickVisiblePassword}
                        />
                    ) : (
                        <EyeOff
                            className={`${styles.icon} text-gray-500 cursor-pointer peer-disabled:opacity-50 select-none`}
                            onClick={handleClickVisiblePassword}
                        />
                    )}
                </div>
            )}
        </div>
    );
};
export default Input;
