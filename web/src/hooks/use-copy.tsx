import { useState, useRef } from "react";

export const useCopy = () => {
    const [isCopied, setIsCopied] = useState(false);
    const timerClipboardRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const copyToClipboard = async (text: string) => {
        if (timerClipboardRef.current) {
            clearTimeout(timerClipboardRef.current);
        }
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        timerClipboardRef.current = setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    };
    return { isCopied, copyToClipboard };
};
