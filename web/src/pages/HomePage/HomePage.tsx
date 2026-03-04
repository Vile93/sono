import CreateRoom from "./components/CreateRoom/CreateRoom";
import FeatureBadges from "./components/FeatureBadges/FeatureBadges";
import Hero from "./components/Hero/Hero";
import JoinRoom from "./components/JoinRoom/JoinRoom";

const HomePage = () => {
    return (
        <div>
            <Hero />
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <CreateRoom />
                <JoinRoom />
            </div>
            <FeatureBadges />
        </div>
    );
};

export default HomePage;
