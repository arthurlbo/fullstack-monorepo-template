import React, { act } from "react";
import { Linking } from "react-native";
import { create } from "react-test-renderer";
import type { TIcon } from "@repo/design-system-mobile/components";
import { LinkButton } from "./link-button";

vi.mock("react-native", () => ({
    Linking: { openURL: vi.fn().mockResolvedValue(null) },
}));

vi.mock("@repo/design-system-mobile/components", () => ({
    Button: ({
        children,
        onPress,
        className,
    }: {
        children: React.ReactNode;
        onPress?: () => void;
        className?: string;
    }) => React.createElement("TouchableOpacity", { onPress, className }, React.createElement("Text", null, children)),
}));

const mockIcon = { icon: () => null } as unknown as TIcon;

const mockProps = {
    href: "https://github.com/arthurlbo/fullstack-monorepo-template",
    label: "Explore Docs",
    icon: mockIcon,
};

describe("LinkButton", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders the label text", async () => {
        let renderer: ReturnType<typeof create>;

        await act(async () => {
            renderer = create(<LinkButton {...mockProps} />);
        });

        const textElement = renderer!.root.findAll((node) => node.props.children === mockProps.label)[0];
        expect(textElement).toBeDefined();
    });

    it("calls Linking.openURL with the correct href when pressed", async () => {
        let renderer: ReturnType<typeof create>;

        await act(async () => {
            renderer = create(<LinkButton {...mockProps} />);
        });

        const pressable = renderer!.root.findAll((node) => typeof node.props.onPress === "function")[0]!;

        await act(async () => {
            pressable.props.onPress();
        });

        expect(Linking.openURL).toHaveBeenCalledWith(mockProps.href);
        expect(Linking.openURL).toHaveBeenCalledTimes(1);
    });

    it("does not call Linking.openURL before being pressed", async () => {
        await act(async () => {
            create(<LinkButton {...mockProps} />);
        });

        expect(Linking.openURL).not.toHaveBeenCalled();
    });

    it("passes the className prop to the underlying Button", async () => {
        let renderer: ReturnType<typeof create>;

        await act(async () => {
            renderer = create(<LinkButton {...mockProps} className="custom-class" />);
        });

        const pressable = renderer!.root.findAll((node) => typeof node.props.onPress === "function")[0]!;
        expect(pressable.props.className).toBe("custom-class");
    });
});
