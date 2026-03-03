export const TRANSITION = {
    A: {
        transition: { duration: 0.2, ease: "easeInOut" },
        ease: "easeInOut",
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
    },
} as const;
