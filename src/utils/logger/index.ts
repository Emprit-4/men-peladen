import createInstance from "./instance";
import { join as joinPath, resolve as resolvePath } from "path";
import configs from "../../configs";

// types
import { Logger } from "winston";

const loggerInstances: Record<string, Logger> = {};

// Cari transpor dengan nama terpanjang
const fileNames = Object.keys(configs.logger.fileNames);
let maxLength = 0;

for (let i = 0; i < fileNames.length; ++i) {
    if (fileNames[i].length > maxLength) {
        maxLength = fileNames[i].length;
    }
}

maxLength += 4;

// Insialisasi transport dari yang ada di config.js
for (let i = 0; i < fileNames.length; ++i) {
    const filePath = resolvePath(
        joinPath(configs.logger.folder, configs.logger.fileNames[fileNames[i]])
    );

    const instances = createInstance(fileNames[i], filePath, {
        prepad: maxLength - (fileNames[i].length + 3),
    });

    loggerInstances[fileNames[i]] = instances;
}

// Ekspor
export default loggerInstances;
