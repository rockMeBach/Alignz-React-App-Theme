import { useSelector } from "react-redux"
import BACKEND_URL from "../../../Backend_url";
export async function makeApiRequest(path) {
    try {
        const response = await fetch(`http://${BACKEND_URL}/${path}`);
        return response.json();
    } catch (error) {
        throw new Error(`CryptoCompare request error: ${error.status}`);
    }
}

export function generateSymbol(exchange, fromSymbol, toSymbol) {
    const short = `${fromSymbol}/${toSymbol}`;
    return {
        short,
        full: `${exchange}:${short}`,
    };
}
