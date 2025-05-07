import mongoose from "mongoose";
//@ts-expect-error belum ada typing-nya.
import { parseUri } from "parseuri";

const URIPattern =
    /^(mongodb(?:\+srv)?:(\/{2}))((\w+?):(\w+?)@|:?@?)((\w|-|\.)+?)(:(\d+))?.$/gm;

// Cek apakah uri yang diberikan sama merupakan uri mongodb yang valid
function isUriMongo(uri: string): boolean {
    const { origin } = parseUri(uri);

    // Cek truthiness, baru cek kesamaan pola
    return origin && origin.match(URIPattern);
}

// Wrapper untuk koneksi ke mongodb
function connect(uri: string, timeout: number) {
    if (!isUriMongo(uri)) {
        throw new TypeError(
            "createConnection: URI yang diberikan bukan sebuah URI MongoDB yang valid"
        );
    }

    // Ambil query "appName" untuk mendapatkan nama
    // Kalau tidak ada, pakai uri saja
    const parsedUri = parseUri(uri);
    const appName: string =
        parsedUri.queryParams.get("appName") || parsedUri.origin;

    // Membuka koneksi
    const connection = mongoose.connection;
    mongoose.connect(uri, {
        serverSelectionTimeoutMS: timeout,
    });

    return { connection, appName };
}

export default connect;
