// Ambil env seawal-awalnya
import env from "./utils/env";
env();

// Impor modul utama
import express from "express";
import helmet from "helmet";
import cors from "cors";

// Impor modul lain
import getLocalIPAddresses from "./utils/local-addrs";
import db from "./utils/db-connect";
import models from "./models";

// Impor logger
import loggerInstances from "./utils/logger";
import requestLogger from "./middlewares/http-logger";

const { ServerLog, DBLog } = loggerInstances;

// Setup
const app = express();
const dbms = db(process.env.MONGODB_URI, +process.env.MONGODB_TIMEOUT);

dbms.connection.on(
    "open",
    () => void DBLog.info(`Terkoneksi ke kluster ${dbms.appName}`)
);

// Middlewares
app.use(cors());
app.use(helmet());
app.use(requestLogger());

// Akhirnya, saatnya listen.
app.listen(+process.env.PORT, process.env.ADDR, () => {
    ServerLog.info("Server berjalan!");

    // Jika dalam development, tampilkan alamat lokal IP yang mungkin
    const addresses = getLocalIPAddresses(+process.env.PORT);
    if (process.env.NODE_ENV === "development" && addresses.length !== 0) {
        ServerLog.debug(`Alamat lokal yang mungkin:${addresses.join(",")}`);
        ServerLog.warn("Alamat lokal yang diberikan tidak menggunakan https");
    }

    // Muat infoh lainnya
    DBLog.debug(`Termuat ${models.count} model`);
});
