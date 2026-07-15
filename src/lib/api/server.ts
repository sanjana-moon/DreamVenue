import { headers } from "next/headers";
import { auth } from "../auth";
import { baseURL } from "./baseUrl";

type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

const getToken = async (): Promise<string | null> => {
    const { token } = await auth.api.getToken({
        headers: await headers(),
    });

    console.log("\n========== GET TOKEN ==========");
    console.log("Token Exists:", !!token);

    if (token) {
        console.log("Preview:", token.substring(0, 40) + "...");
    }

    console.log("===============================\n");

    return token;
};

export const serverMutation = async <TResponse = unknown, TBody = unknown>(
    path: string,
    method: HttpMethod,
    data: TBody
): Promise<TResponse> => {
    const token = await getToken();
    const res = await fetch(`${baseURL}${path}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    console.log("Response:", res.status);

    return res.json() as Promise<TResponse>;
};

export const deleteMutation = async <TResponse = unknown>(
    path: string
): Promise<TResponse> => {
    const token = await getToken();

    const res = await fetch(`${baseURL}${path}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    console.log("Response:", res.status);

    return res.json() as Promise<TResponse>;
};

export const serverFetch = async <TResponse = unknown>(
    path: string,
    isProtected = false
): Promise<TResponse> => {
    const options: RequestInit = {
        cache: "no-store",
    };

    if (isProtected) {
        const token = await getToken();

        console.log("Token Exists:", !!token);

        options.headers = {
            Authorization: `Bearer ${token}`,
        };
    }
    const res = await fetch(`${baseURL}${path}`, options);

    return res.json() as Promise<TResponse>;
};