declare namespace NodeJS {
    export interface ProcessEnv {
        NODE_ENV: string; // di luar .env
        ADDR: string;
        PORT: string;
        MONGODB_URI: string;
        MONGODB_TIMEOUT: string;
    }
}
