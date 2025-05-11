import { NetworkInterfaceInfo, networkInterfaces } from "os";

// Mencari alamat lokal yang mungkin dapat diakses
// Dikeluarkan dalam format http://{ip}:{port}
function getLocalIPAddresses(port: number) {
    const nets = networkInterfaces();
    const netsKey = Object.keys(nets);

    const addresses = [];

    // Proses mencari alamat lokal yang mungkin
    for (let i = 0; i < netsKey.length; i += 1) {
        // Nggak mungkin undefined
        const net = <NetworkInterfaceInfo[]>nets[netsKey[i]];

        const localAddress = net.find((addr) => {
            const familyV4Value = typeof addr.family === "string" ? "IPv4" : 4;
            return addr.family === familyV4Value && !addr.internal;
        });

        if (localAddress) {
            addresses.push(` http://${localAddress.address}:${port}`);
        }
    }

    return addresses;
}

export default getLocalIPAddresses;
