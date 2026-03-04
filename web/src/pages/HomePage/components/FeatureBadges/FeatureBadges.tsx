import styles from "./FeatureBadges.module.css";

const FeatureBadges = () => {
    return (
        <div className="mt-16 text-center">
            <div className="flex flex-col md:flex-row md:inline-flex items-center gap-6 px-8 py-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
                <div className={`${styles.featureBadge}`}>
                    <div className={`${styles.featureBadgeIcon} bg-green-400`}></div>
                    <span className={styles.featureBadgeText}>End-to-End Encrypted</span>
                </div>
                <div className={`${styles.verticalLine}`}></div>
                <div className={`${styles.featureBadge}`}>
                    <div className={`${styles.featureBadgeIcon} bg-blue-400`}></div>
                    <span className={styles.featureBadgeText}>Direct P2P Connection</span>
                </div>
                <div className={`${styles.verticalLine}`}></div>
                <div className={`${styles.featureBadge}`}>
                    <div className={`${styles.featureBadgeIcon} bg-cyan-400`}></div>
                    <span className={styles.featureBadgeText}>No Server Recording</span>
                </div>
            </div>
        </div>
    );
};

export default FeatureBadges;
