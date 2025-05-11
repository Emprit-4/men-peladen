// Warning: karena impornya bersifat dinamis, typescript tidak melakukan type-checking
// Mungkin dapat berpengaruh pada produktivitas

/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { readdirSync } from "fs";
import {
    join as joinPath,
    parse as parsePath,
    isAbsolute as isPathAbsolute,
} from "path";

type RString = Record<string, any>;

/**
 * Impor modul secara dinamis menggunakan CommonJS.
 * Modul yang diimpor tidak mendukung fitur Intellisense dan type-checking.
 */
function loadModules(dirPath: string, entry: string = "index.ts") {
    // Cek apakah path yang diberikan berjenis absolut!
    if (!isPathAbsolute(dirPath)) {
        throw new Error("Path tidak absolut!");
    }

    const modules: RString = {};
    const files = readdirSync(dirPath);

    // Jika ada berkas index.ts, eksklusikan
    const indexOfEntry = files.indexOf(entry);
    if (indexOfEntry > -1) {
        files[indexOfEntry] = files[files.length - 1];
        files.pop();
    }

    // Proses impor ada di sini
    for (let i = 0, count = 0, fileName = ""; i < files.length; ++i) {
        fileName = parsePath(files[i]).name;
        count = 0;

        /* Behaviour yang kita mau adalah sebagai berikut.
           1. Jika hanya ada `export default` saja, jadikan sebagai ekspor utama
           2. Jika hanya ada `export` saja, jadikan itu sebagai properti
           3. Jika ada dua-duanya, `export default` akan dianggap sebagai properti
        */
        const imported: RString = require(joinPath(dirPath, fileName));
        modules[fileName] = {};

        for (const prop in imported) {
            modules[fileName][prop] = imported[prop];
            ++count;
        }

        // Khusus kasus 1.
        // Cek apakah hanya ada satu ekspor, dan ekspor tersebut merupakan `export.default`
        if (count === 1) {
            modules[fileName] = imported.default || modules[fileName];
        }
    }

    return modules;
}

// Ekspor
export default loadModules;
