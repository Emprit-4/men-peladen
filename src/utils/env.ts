import dotenv from "dotenv";

// types
import { DotenvParseOutput } from "dotenv";

function isEnvEmpty(obj: DotenvParseOutput) {
    for (const key in obj) {
        return false;
    }

    return true;
}

// Fungsi ini mengambil .env, menguji ada/tidaknya nilai .env dan NODE_ENV
function initEnv() {
    // Jenis env harus disebut secara eksplisit!
    if (!("NODE_ENV" in process.env)) {
        throw new Error("Tidak ada NODE_ENV");
    }

    // Muat konfigurasi di .env
    const env = <DotenvParseOutput>dotenv.config().parsed;

    // Cek apakah objek kosong
    if (isEnvEmpty(env)) {
        throw new Error("Tidak ada .env yang diberikan!");
    }

    // Cek apakah ada konfig yang bernilai kosong
    for (const config in env) {
        if (env[config] === "") {
            throw new Error(`${config} tidak bernilai!`);
        }
    }
}

export default initEnv;
