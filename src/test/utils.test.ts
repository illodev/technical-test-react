import { describe, expect, it } from "vitest";
import { z } from "zod";

import { getZodDefaults } from "@/lib/utils";

describe("getZodDefaults", () => {
    it("should return an object with default values based on the provided schema", () => {
        const schema = z.object({
            name: z.string(),
            age: z.number().default(18),
            email: z.string().email().default("test@example.com"),
        });

        const defaults = getZodDefaults(schema);

        expect(defaults).toEqual({
            name: undefined,
            age: 18,
            email: "test@example.com",
        });
    });

    it("should override default values with provided defaultValues object", () => {
        const schema = z.object({
            name: z.string(),
            age: z.number().default(18),
            email: z.string().email().default("test@example.com"),
        });

        const defaultValues = {
            name: "John Doe",
            age: 25,
        };

        const defaults = getZodDefaults(schema, defaultValues);

        expect(defaults).toEqual({
            name: "John Doe",
            age: 25,
            email: "test@example.com",
        });
    });

    it("should return undefined for keys without default values", () => {
        const schema = z.object({
            name: z.string(),
            age: z.number().default(18),
            email: z.string().email(),
        });

        const defaults = getZodDefaults(schema);

        expect(defaults).toEqual({
            name: undefined,
            age: 18,
            email: undefined,
        });
    });
});
