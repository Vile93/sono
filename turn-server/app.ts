import Turn from "node-turn";
import "dotenv/config";

const turnServer = new Turn({
    authMech: "none",
    listeningPort: 3480,
    debugLevel: "OFF",
    credentials: {
        [process.env.TURN_SERVER_USERNAME!]: process.env.TURN_SERVER_CREDENTIAL!,
    },
});

turnServer.start();
console.log("TURN server started");
