import { Link } from "react-router-dom";
import { ROUTES } from "../constants/router";

const NotFound = () => {
    return (
        <div className="absolute top-1/3 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center text-sm max-md:px-4">
            <h1 className="text-8xl md:text-9xl font-bold text-indigo-500">404</h1>
            <div className="h-1 w-16 rounded bg-indigo-500 my-5 md:my-7"></div>
            <p className="text-2xl md:text-3xl font-bold text-gray-800">Page Not Found</p>
            <p className="text-sm md:text-base mt-4 text-gray-500 max-w-md text-center">
                The page you are looking for might have been removed, had its name changed, or is
                temporarily unavailable.
            </p>
            <div className="flex items-center gap-4 mt-6">
                <Link
                    to={ROUTES.HOME}
                    className="bg-gray-800 hover:bg-black px-7 py-2.5 text-white rounded-md active:scale-95 transition-all"
                >
                    Return Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
