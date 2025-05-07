import morgan from "morgan";
import logger from "../utils/logger/index";

const { HTTPReqLog } = logger;

// Atur format
const format = process.env.NODE_ENV === "development" ? "dev" : "combined";

// Handlernya diubah ke handler bawaan server ini
function requestLogger() {
    return morgan(format, {
        stream: {
            write(msg: string) {
                HTTPReqLog.info(msg.trim());
            },
        },
    });
}

// Ekspor
export default requestLogger;
