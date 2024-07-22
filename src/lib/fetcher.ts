import { env } from "@/env.mjs";

export interface ApiErrorLike {
    status: number;
    message: Error;
    cause?: Error;
}

export const isObject = (
    object: unknown
): object is Record<string, unknown> => {
    return (
        typeof object === "object" && object !== null && !Array.isArray(object)
    );
};

export const isApiError = (error: unknown): error is ApiErrorLike => {
    if (!isObject(error)) return false;

    if (error instanceof Error) return true;

    return findError(error);
};

function findError<T extends object>(error: T): boolean {
    if (Object.prototype.toString.call(error) === "[object Error]") {
        return true;
    }

    const prototype = Object.getPrototypeOf(error) as T | null;

    return prototype === null ? false : findError(prototype);
}

const getCookies = async () => {
    if (typeof window === "undefined") {
        const headerInstance = (
            await import("next/headers").then((mod) => mod.headers)
        )();
        const cookie = headerInstance.get("Cookie") || "";
        return cookie;
    }

    return "";
};

const getAppUrl = () => {
    if (typeof window === "undefined") {
        return env.NEXT_SERVER_URL;
    }

    return env.NEXT_PUBLIC_APP_URL;
};

export async function fetcher<TData>({
    cache = "force-cache",
    uri,
    headers,
    tags,
}: {
    cache?: RequestCache;
    uri: string;
    headers?: HeadersInit;
    tags?: string[];
}): Promise<{ status: number; body: TData } | never> {
    try {
        const cookie = await getCookies();
        const endpoint = new URL(uri, getAppUrl()).toString();

        const result = await fetch(endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Cookie: cookie,
                ...headers,
            },
            cache,
            ...(tags && { next: { tags } }),
        });

        if (!result.ok) {
            throw {
                status: result.status,
                message: await result.text(),
            };
        }

        const body = await result.json();

        return {
            status: result.status,
            body,
        };
    } catch (e) {
        if (isApiError(e)) {
            throw {
                cause: e.cause?.toString() || "unknown",
                status: e.status || 500,
                message: e.message,
            };
        }

        throw {
            error: e,
        };
    }
}
