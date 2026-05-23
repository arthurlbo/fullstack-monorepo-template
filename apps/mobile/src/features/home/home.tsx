import { Text, View } from "react-native";
import { BookOpen, Globe } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinkButton } from "@/shared/components/navigation";

export const Home = () => {
    return (
        <SafeAreaView className="flex-1 bg-background">
            <View className="flex-1 items-center justify-center gap-8 px-6">
                <View className="items-center gap-3">
                    <Text className="font-heading text-3xl text-primary-100">Hello Dev</Text>
                    <Text className="max-w-xs text-center font-body text-sm text-primary-400">
                        A modern Full-stack monorepo template to kickstart your mobile development.
                    </Text>
                </View>

                <View className="flex-row items-center gap-3">
                    <LinkButton
                        label="Explore Docs"
                        href="https://github.com/arthurlbo/fullstack-monorepo-template"
                        icon={{ icon: BookOpen }}
                    />
                    <LinkButton
                        href="https://www.linkedin.com/in/arthurlbo/"
                        label="Who Am I?"
                        icon={{ icon: Globe }}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};
