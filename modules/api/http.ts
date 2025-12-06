import axios from "axios";

const serverUrl = process.env.EXPO_PUBLIC_SERVER_URL;

export enum HttpMethod {
    GET = "GET",
    POST = "POST",
}

export async function get<T>(endpoint: string, headers: any): Promise<T> {
    const response = await axios.get(serverUrl + endpoint, {headers});
    if (response.status != 200) throw new Error("Response returned error: " + JSON.stringify(response));
    return await response.data as Promise<T>;
}

export async function post<T>(endpoint: string, data: any): Promise<T> {
    const response = await axios.post(serverUrl + endpoint, data);
    if (response.status != 200) throw new Error("Response returned error: " + response.statusText);
    return await response.data as Promise<T>;
}