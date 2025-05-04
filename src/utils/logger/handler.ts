import { transports } from "winston";
import { createConsoleOptions, createFileOptions } from "./option";

// types
import { LoggerTweaks } from "./option";

// Fungsi untuk membuat winston transport
function createHandler(name: string, filePath: string, tweaks: LoggerTweaks) {
    const handlers = [];

    // transport untuk console stream
    const consoleOptions = createConsoleOptions(name, tweaks);
    handlers.push(new transports.Console(consoleOptions));

    // transport untuk file stream
    if (filePath && process.env.NODE_ENV === "production") {
        const fileOptions = createFileOptions(filePath);
        handlers.push(new transports.File(fileOptions));
    }

    // Ouput keduanya sebagai list
    return handlers;
}

// Ekspor
export default createHandler;
