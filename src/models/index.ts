/* eslint-disable @typescript-eslint/no-explicit-any */
import loadModules from "../utils/modules-loader";
import logger from "../utils/logger/index";

const { DBLog } = logger;

// types
import { Model } from "mongoose";
type MongooseModelsRecord = Record<string, Model<any, any, any, any, any, any>>;

// impor model-modelnya
const models = {
    source: <MongooseModelsRecord>loadModules(__dirname),
    count: 0,
};

/*
 * Prefer ini daripada for loop dengan Object.keys.
 * Looping yang ini lebih enak ramah di memori, walau performanya keganggu dikit
 * Yah, hal begini pasti ada komprominya.
 */
function watchModel(e: any) {
    DBLog.debug(`Ada aksi ${e.operationType} di collection "${e.ns.coll}"`);
}

for (const model in models.source) {
    // Pasang observer untuk tiap model (dalam development)
    if (process.env.NODE_ENV === "development") {
        models.source[model].watch().on("change", watchModel);
    }

    // Hitung jumlah model yang termuat
    ++models.count;
}

// Ekspor
export default models;
