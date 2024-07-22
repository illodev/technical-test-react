import { describe, expect, it } from "vitest";

import { isApiError } from "@/lib/fetcher";

describe("isApiError", () => {
    it("should return true if the error is an instance of Error", () => {
        const error = new Error("Test error");
        expect(isApiError(error)).toBe(true);
    });

    it("should return false if the error is null", () => {
        const error = null;
        expect(isApiError(error)).toBe(false);
    });

    it("should return false if the error is undefined", () => {
        const error = undefined;
        expect(isApiError(error)).toBe(false);
    });

    it("should return false if the error is a string", () => {
        const error = "Test error";
        expect(isApiError(error)).toBe(false);
    });

    it("should return false if the error is a number", () => {
        const error = 123;
        expect(isApiError(error)).toBe(false);
    });

    it("should return false if the error is an array", () => {
        const error = [1, 2, 3];
        expect(isApiError(error)).toBe(false);
    });
});
