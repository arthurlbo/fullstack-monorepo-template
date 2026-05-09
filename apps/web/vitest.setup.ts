import "@testing-library/jest-dom/vitest";

Element.prototype.scrollIntoView = vi.fn();
global.structuredClone = (val: unknown) => JSON.parse(JSON.stringify(val));
global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
};

global.IntersectionObserver = class IntersectionObserver {
    readonly root: Element | null = null;
    readonly rootMargin: string = "";
    readonly thresholds: ReadonlyArray<number> = [];

    disconnect() {}
    observe() {}
    takeRecords() {
        return [];
    }
    unobserve() {}
} as never;
