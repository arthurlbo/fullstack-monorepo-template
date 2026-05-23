import { Linking } from "react-native";
import { Button } from "@repo/design-system-mobile/components";

interface ILinkButtonProps {
    href: string;
    label: string;
    icon: TIcon;
    className?: string;
}

export const LinkButton = ({ className, href, label, icon }: ILinkButtonProps) => {
    return (
        <Button className={className} iconRight={icon} onPress={() => Linking.openURL(href)}>
            {label}
        </Button>
    );
};
