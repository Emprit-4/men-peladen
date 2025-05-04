import { readdirSync } from "fs";
import {
    join as joinPath,
    parse as paresPath,
    normalize as normalizePath,
} from "path";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */

/** Impor modul secara dinamis menggunakan CommonJS */
function loadModules(
    dirPath: string,
    entry: string = "index.ts"
): Record<string, any> {
    // Normalisasi path untuk jaga-jaga
    dirPath = normalizePath(dirPath);

    const modules: Record<string, any> = {};
    const files = readdirSync(dirPath).filter((files) => files !== entry);

    // Proses impor ada di sini
    for (let i = 0, len = files.length, fileName; i < len; ++i) {
        fileName = paresPath(files[i]).name;

        modules[fileName] = require(joinPath(dirPath, fileName)).default;
    }

    return modules;
}

// Ekspor
export default loadModules;
