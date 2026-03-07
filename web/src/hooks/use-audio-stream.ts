import { useEffect, useRef, type RefObject } from "react";

type Props = {
    stream: MediaStream | null;
    onSpeakingChange: (isSpeaking: boolean, isSpeakTimer: RefObject<number | null>) => void;
};

export const useAudioStream = ({ stream, onSpeakingChange }: Props) => {
    const isSpeakTimer = useRef<ReturnType<typeof setTimeout>>(null);
    useEffect(() => {
        if (stream) {
            const audioContext = new AudioContext();
            const source = audioContext.createMediaStreamSource(stream);
            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            source.connect(analyser);
            let animationFrameId: number;
            const checkVolume = () => {
                analyser.getByteFrequencyData(dataArray);
                const average = dataArray.reduce((a, b) => a + b, 0) / bufferLength;
                onSpeakingChange(average > 15, isSpeakTimer);
                animationFrameId = requestAnimationFrame(checkVolume);
            };
            checkVolume();
            return () => {
                if (isSpeakTimer && isSpeakTimer.current) {
                    clearTimeout(isSpeakTimer.current);
                }
                cancelAnimationFrame(animationFrameId);
            };
        }
    }, [stream]);
};
