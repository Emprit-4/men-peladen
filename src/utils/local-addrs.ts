import { NetworkInterfaceInfo, networkInterfaces } from "os";
import configs from "../configs";

// Mencari alamat lokal yang mungkin dapat diakses
function getLocalIPAddresses() {
    const nets = networkInterfaces();
    const netsKey = Object.keys(nets);

    if (netsKey.length === 0) {
        return [];
    }

    // Proses mencari alamat lokal yang mungkin
    const addresses = [];

    for (let i = 0, len = netsKey.length; i < len; i += 1) {
        // Nggak mungkin undefined
        const net = <NetworkInterfaceInfo[]>nets[netsKey[i]];

        const localAddress = net.find((addr) => {
            const familyV4Value = typeof addr.family === "string" ? "IPv4" : 4;
            return addr.family === familyV4Value && !addr.internal;
        });

        if (localAddress) {
            addresses.push(localAddress.address);
        }
    }

    // Ubah ke bentuk tulisan yang bermanfaat
    const text = [];

    for (let i = 0; i < addresses.length; ++i) {
        text.push(` http://${addresses[i]}:${configs.server.port}`);
    }

    return text;
}

export default getLocalIPAddresses;
