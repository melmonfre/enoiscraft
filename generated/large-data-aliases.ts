
import pako from 'pako';

globalThis.pako = { inflate: pako.inflate.bind(pako) }

function decompressFromBase64(input) {
    console.time('decompressFromBase64')
    // Decode the Base64 string
    const binaryString = atob(input);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);

    // Convert the binary string to a byte array
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }

    // Decompress the byte array
    const decompressedData = pako.inflate(bytes, { to: 'string' });

    console.timeEnd('decompressFromBase64')
    return decompressedData;
}

export const importLargeData = async (mod: 'mcData' | 'blockStatesModels') => {
  if (mod === 'mcData') return JSON.parse(decompressFromBase64((await import(/* webpackChunkName: "mc-data" */ '../generated/mc-data-compressed.js')).default))
  if (mod === 'blockStatesModels') return JSON.parse(decompressFromBase64((await import(/* webpackChunkName: "mc-assets" */ '../generated/mc-assets-compressed.js')).default))
}
