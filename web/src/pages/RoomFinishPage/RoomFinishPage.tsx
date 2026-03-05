import { useLocation } from "react-router-dom";
import StatusPage from "../../components/StatusPage/StatusPage";
import NotFound from "../NotFound";

const RoomFinishPage = () => {
    const location = useLocation();
    const data = location.state;
    if (!data?.reason) {
        return <NotFound />;
    }
    return <StatusPage title="200" subtitle="Exited" description="You have left the room." />;
};

export default RoomFinishPage;
