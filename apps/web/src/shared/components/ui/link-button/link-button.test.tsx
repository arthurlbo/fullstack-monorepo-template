import { IconHome } from "@tabler/icons-react";
import { render, screen } from "@testing-library/react";

import { LinkButton } from "./link-button";

const mockProps = {
    label: "Home",
    icon: IconHome,
    href: "https://example.com",
};

describe("LinkButton", () => {
    it("renders link with label and icon", () => {
        render(<LinkButton {...mockProps} />);

        expect(screen.getByText("Home")).toBeInTheDocument();

        expect(document.querySelector("svg")).toBeInTheDocument();

        expect(screen.getByRole("link")).toHaveAttribute("href", "https://example.com");
    });

    it("renders with correct accessibility attributes", () => {
        render(<LinkButton {...mockProps} />);

        const link = screen.getByRole("link");

        expect(link).toHaveAttribute("aria-label", "Home");
    });

    it("always renders as an external link with security attributes", () => {
        render(<LinkButton {...mockProps} />);

        const link = screen.getByRole("link");

        expect(link).toHaveAttribute("target", "_blank");

        expect(link).toHaveAttribute("rel", "noreferrer");
    });

    it("merges custom className with default classes", () => {
        const customClass = "my-custom-class";
        render(<LinkButton {...mockProps} className={customClass} />);

        const link = screen.getByRole("link");

        expect(link).toHaveClass(customClass);
        expect(link).toHaveClass("flex", "items-center", "gap-1");
    });
});
