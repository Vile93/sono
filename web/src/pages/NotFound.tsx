import StatusPage from "../components/StatusPage/StatusPage";

const NotFound = () => {
    return (
        <StatusPage
            title="404"
            description={`The page you are looking for might have been removed, had its name changed, or is
                        temporarily unavailable.`}
        />
    );
};

export default NotFound;
