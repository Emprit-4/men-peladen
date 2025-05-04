import chalk from "chalk";
import { format } from "winston";

// types
/** Konfigurasi internal untuk logger */
export interface LoggerTweaks {
    prepad: number;
}

const dev = process.env.NODE_ENV === "development";

// Mengatur warna-warna yang akan digunakan dalam logging console
const colors: Record<string, typeof chalk> = {
    error: chalk.red,
    warn: chalk.yellow,
    info: chalk.blue,
    debug: chalk.green,
};

// Mengatur bentuk output
function simple(tweaks: LoggerTweaks) {
    return format.printf((info): string => {
        // return chalk[colors[info.level] as keyof Chalk];
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
    return {
        format: format.combine(
            // options.colors,
            format.label({ label: name, message: false }),
            format.errors({ stack: true }),
            simple(tweaks)
        ),
        handleExceptions: false,
        level: dev ? "debug" : "info",
    };
}

// Opsi untuk file stream
function createFileOptions(filePath: string) {
    return {
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
