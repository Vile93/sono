import { useEffect, useRef } from "react";
import { useRtcStore } from "../../store/rtc.store";

const Audio = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const { audio, setAudio } = useRtcStore();
    useEffect(() => {
        if (audioRef.current && !audio) {
            setAudio(audioRef.current);
        }
        return () => {
            if (audio) {
                audio.srcObject = null;
                setAudio(null);
            }
        };
    }, [audio, setAudio]);
    return <audio ref={audioRef} autoPlay playsInline controls={false}></audio>;
};

export default Audio;
