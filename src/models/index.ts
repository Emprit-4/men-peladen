import loadModules from "../utils/modules-loader";

/* eslint-disable @typescript-eslint/no-explicit-any */

// types
import { Model } from "mongoose";

const models = <Record<string, Model<any, any, any, any, any, any>>>(
    loadModules(__dirname)
);

const modelsCount = Object.keys(models).length;

// Ekspor
export { models, modelsCount };
