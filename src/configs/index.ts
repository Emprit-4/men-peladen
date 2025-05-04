import loadModules from "../utils/modules-loader";

// Muat konfigurasi di .env
import "dotenv/config";

// Jenis env harus disebut secara eksplisit!
if (!("NODE_ENV" in process.env)) {
    throw new Error("Tidak ada NODE_ENV");
}

// Muat konfigurasi di folder configs
// Warning: karena impornya bersifat dinamis, typescript tidak melakukan type-checking
// Mungkin dapat berpengaruh pada produktivitas
const configs = loadModules(__dirname);

// Ekspor
export default configs;
