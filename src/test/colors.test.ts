import { describe, expect, it } from "vitest";

import { getHex } from "@/lib/colors";

describe("getHex", () => {
    it("should return the hex value for the specified color and shade", () => {
        expect(getHex("blue", "500")).toBe("#3b82f6");
        expect(getHex("green", "800")).toBe("#166534");
        expect(getHex("purple", "200")).toBe("#e9d5ff");
    });

    it("should return the default hex value if color is not specified", () => {
        expect(getHex()).toBe("#737373");
        expect(getHex(null)).toBe("#737373");
    });

    it("should return the default hex value if color or shade is invalid", () => {
        expect(getHex()).toBe("#737373");
        expect(getHex("blue")).toBe("#3b82f6");
    });
});
