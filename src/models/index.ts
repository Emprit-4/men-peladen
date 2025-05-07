/* eslint-disable @typescript-eslint/no-explicit-any */
import loadModules from "../utils/modules-loader";
import logger from "../utils/logger/index";

const { DBLog } = logger;

// types
import { Model } from "mongoose";
type MongooseModelsRecord = Record<string, Model<any, any, any, any, any, any>>;

// impor model-modelnya
const models = <MongooseModelsRecord>loadModules(__dirname);
const modelsKeys = Object.keys(models);
const modelsCount = modelsKeys.length;

// Pasang observer untuk tiap model.
if (process.env.NODE_ENV === "development") {
    for (let i = 0; i < modelsCount; ++i) {
        models[modelsKeys[i]].watch().on("change", (e) => {
            DBLog.debug(
                `Ada aksi ${e.operationType} di collection "${e.ns.coll}"`
            );
        });
    }
}

// Ekspor
export { models, modelsCount };
