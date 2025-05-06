import chalk from "chalk";
import { format } from "winston";

const dev = process.env.NODE_ENV === "development";

// types
import { ChalkInstance } from "chalk";
import {
    ConsoleTransportOptions,
    FileTransportOptions,
} from "winston/lib/winston/transports";

// Untuk konfigurasi internal
export interface LoggerTweaks {
    prepad: number;
}

// Mengatur warna-warna yang akan digunakan dalam logging console
const colors: Record<string, ChalkInstance> = {
    error: chalk.red,
    warn: chalk.yellow,
    info: chalk.blue,
    debug: chalk.green,
};

// Mengatur bentuk output
function simple(tweaks: LoggerTweaks) {
    return format.printf((info): string => {
        return (
            colors[info.level].bold("\u25A0") +
            colors[info.level].bold.underline(`[${info.label}]`) +
            " ".repeat(tweaks.prepad) +
            info.message
        );
    });
}

// Opsi untuk console stream
// Logger console dibuat sesederhana mungkin untuk meningkatkan keterbacaan
function createConsoleOptions(name: string, tweaks: LoggerTweaks) {
    return <ConsoleTransportOptions>{
        format: format.combine(
            format.label({ label: name, message: false }),
            format.errors({ stack: true }),
            simple(tweaks)
        ),
        handleExceptions: true,
        level: dev ? "debug" : "info",
    };
}

// Opsi untuk file stream
function createFileOptions(filePath: string) {
    return <FileTransportOptions>{
        // atau ini
        format: format.combine(
            format.timestamp(),
            format.logstash(),
            format.errors({ stack: true })
        ),
        // options: {flags: "w", // log terdahulu dibersihkan},
        filename: filePath,
        maxsize: 2_097_152, // 2 MB dalam bytes
        maxFiles: 5,
        handleExceptions: true,
        level: "info",
    };
}

// Ekspor
export { createConsoleOptions, createFileOptions };
