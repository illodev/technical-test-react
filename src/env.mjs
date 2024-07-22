import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        NEXT_SERVER_URL: z.string().min(1),
        NEXTAUTH_URL: z.string().min(1),
        NEXTAUTH_SECRET: z.string().min(1),
        GITHUB_APP_CLIENT_ID: z.string().min(1),
        GITHUB_APP_CLIENT_SECRET: z.string().min(1),
        GOOGLE_APP_CLIENT_ID: z.string().min(1),
        GOOGLE_APP_CLIENT_SECRET: z.string().min(1),
    },
    client: {
        NEXT_PUBLIC_APP_URL: z.string().min(1),
    },
    runtimeEnv: {
        NEXT_SERVER_URL: process.env.NEXT_SERVER_URL,
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        GITHUB_APP_CLIENT_ID: process.env.GITHUB_APP_CLIENT_ID,
        GITHUB_APP_CLIENT_SECRET: process.env.GITHUB_APP_CLIENT_SECRET,
        GOOGLE_APP_CLIENT_ID: process.env.GOOGLE_APP_CLIENT_ID,
        GOOGLE_APP_CLIENT_SECRET: process.env.GOOGLE_APP_CLIENT_SECRET,
    },
});
