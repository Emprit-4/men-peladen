// Impor modul utama
import express from "express";
import helmet from "helmet";
import cors from "cors";

// Bersihkan layar konsol
process.stdout.write("\x1Bc");

// Impor modul lain
import configs from "./configs";
import getLocalIPAddresses from "./utils/local-addrs";

// Impor logger
import RequestLogger from "./middlewares/http-logger";
import loggerInstances from "./utils/logger";

const { ServerLog } = loggerInstances;

// Setup
const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(RequestLogger());

// Akhirnya, saatnya listen.
app.listen(configs.server.port, configs.server.address, () => {
    ServerLog.info("Server berjalan!");

    // Jika dalam development, tampilkan alamat lokal IP yang mungkin
    const addresses = getLocalIPAddresses();
    if (process.env.NODE_ENV === "development" && addresses.length !== 0) {
        ServerLog.debug(`Alamat lokal yang mungkin:${addresses.join(",")}`);
    }
});
