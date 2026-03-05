import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/router";

type Props = {
    title: string;
    subtitle?: string;
    description: string;
};

const StatusPage = ({ description, title, subtitle }: Props) => {
    return (
        <div className="absolute top-1/3 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center text-sm max-md:px-4">
            <h1 className="text-8xl md:text-9xl font-bold from-blue-500 to-cyan-500 bg-clip-text text-transparent bg-linear-to-r">
                {title}
            </h1>
            <div className="h-1 w-16 rounded bg-cyan-500 my-5 md:my-7"></div>
            <p className="text-2xl md:text-3xl font-bold text-white text-center">
                {subtitle ?? `Page Not Found`}
            </p>
            <p className="text-sm md:text-base mt-4 text-white md:max-w-md text-center">
                {description}
            </p>
            <div className="flex items-center gap-4 mt-6">
                <Link to={ROUTES.HOME} className="primary">
                    Go Home
                </Link>
            </div>
        </div>
    );
};

export default StatusPage;
