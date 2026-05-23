import { theme } from "@repo/design-system-mobile/theme";

const HEX_PATTERN = /^#[0-9A-Fa-f]{6}$/;
const COLOR_SCALE = ["100", "200", "300", "400", "500", "600", "700"] as const;

describe("mobile theme tokens", () => {
    describe("colors", () => {
        it("has all required top-level color keys", () => {
            expect(theme.colors).toMatchObject({
                background: expect.any(String),
                foreground: expect.any(String),
                primary: expect.any(Object),
                accent: expect.any(Object),
                surface: expect.any(Object),
            });
        });

        it("has valid hex values for background and foreground", () => {
            expect(theme.colors.background).toMatch(HEX_PATTERN);
            expect(theme.colors.foreground).toMatch(HEX_PATTERN);
        });

        it("has all primary scale tokens as valid hex values", () => {
            for (const step of COLOR_SCALE) {
                expect(theme.colors.primary[step]).toMatch(HEX_PATTERN);
            }
        });

        it("has all accent scale tokens as valid hex values", () => {
            for (const step of COLOR_SCALE) {
                expect(theme.colors.accent[step]).toMatch(HEX_PATTERN);
            }
        });

        it("has all surface scale tokens as valid hex values", () => {
            for (const step of COLOR_SCALE) {
                expect(theme.colors.surface[step]).toMatch(HEX_PATTERN);
            }
        });
    });

    describe("fontFamily", () => {
        it("has all required font variant keys", () => {
            expect(theme.fontFamily).toMatchObject({
                body: expect.any(Array),
                medium: expect.any(Array),
                semibold: expect.any(Array),
                heading: expect.any(Array),
            });
        });

        it("has at least one font name per variant", () => {
            for (const variant of ["body", "medium", "semibold", "heading"] as const) {
                expect(theme.fontFamily[variant].length).toBeGreaterThan(0);
                expect(typeof theme.fontFamily[variant][0]).toBe("string");
            }
        });
    });
});
