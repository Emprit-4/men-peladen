import morgan from "morgan";
import logger from "../utils/logger/index";

const { HTTPReqLog } = logger;

// Atur format
const format = process.env.NODE_ENV === "development" ? "dev" : "combined";

const stream = {
    write(msg: string) {
        HTTPReqLog.info(msg.trim());
    },
};

function RequestLogger() {
    return morgan(format, { stream });
}

// Ekspor
export default RequestLogger;
