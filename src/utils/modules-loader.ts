// Warning: karena impornya bersifat dinamis, typescript tidak melakukan type-checking
// Mungkin dapat berpengaruh pada produktivitas

/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { readdirSync } from "fs";
import {
    join as joinPath,
    parse as parsePath,
    normalize as normalizePath,
} from "path";

/**
 * Impor modul secara dinamis menggunakan CommonJS.
 * Modul yang diimpor tidak mendukung fitur Intellisense dan type-checking.
 */
function loadModules(dirPath: string, entry: string = "index.ts") {
    // Normalisasi path untuk jaga-jaga
    dirPath = normalizePath(dirPath);

    const modules: Record<string, any> = {};
    const files = readdirSync(dirPath).filter((files) => files !== entry);

    // Proses impor ada di sini
    for (let i = 0; i < files.length; ++i) {
        const fileName = parsePath(files[i]).name;
        const importedModule: Record<string, any> = require(
            joinPath(dirPath, fileName)
        );
        const importedModuleKeys = Object.keys(importedModule);

        /* Behaviour yang kita mau adalah sebagai berikut.
           1. Jika hanya ada `export default` saja, jadikan sebagai ekspor utama
           2. Jika hanya ada `export` saja, jadikan itu sebagai properti
           3. Jika ada dua-duanya, `export default` akan dianggap sebagai properti
        */
        // Untuk kasus 1
        if (
            importedModuleKeys.length === 1 &&
            importedModuleKeys[0] === "default"
        ) {
            modules[fileName] = importedModule.default;
            continue;
        }

        // Untuk kasus 2 dan 3
        modules[fileName] = {};

        for (let j = 0; j < importedModuleKeys.length; ++j) {
            modules[fileName][importedModuleKeys[j]] =
                importedModule[importedModuleKeys[j]];
        }
    }

    return modules;
}

// Ekspor
export default loadModules;
