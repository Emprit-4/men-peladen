import { createLogger } from "winston";
import createHandler from "./handler";

// types
import { LoggerTweaks } from "./option";

// Fungsi untuk membuat instances dari transport yang diberikan
function createInstance(name: string, filePath: string, tweaks: LoggerTweaks) {
    const handler = createHandler(name, filePath, tweaks);

    return createLogger({
        // Bug: ConsoleTransportInstance tidak dianggap sebagai turunan dari TransportStream
        // Deklarasinya bisa dilihat di winston/lib/transports/index.d.ts
        // @ts-expect-error: Ada bug interface
        transports: handler,
        exitOnError: true,
    });
}

// Ekspor
export default createInstance;
