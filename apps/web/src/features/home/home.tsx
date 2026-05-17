import { LinkButton } from "@/shared/components/navigation";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";

export const Home = () => {
    return (
        <main className="text-primary-100 flex flex-col items-center gap-6 text-center">
            <h1 className="text-2xl font-bold">Hello Dev</h1>

            <p className="max-w-md">
                This is a modern Full-stack monorepo template designed to accelerate your web development workflow.
            </p>

            <div className="mt-2 flex items-center gap-2">
                <LinkButton
                    href="https://github.com/arthurlbo/fullstack-monorepo-template"
                    label="Explore Documentation"
                    icon={IconBrandGithub}
                    className="border-border text-primary-100 hover:bg-border border bg-transparent"
                />
                <LinkButton
                    href="https://www.linkedin.com/in/arthurlbo/"
                    label="Who Am I?"
                    icon={IconBrandLinkedin}
                    className="text-primary-100 bg-emerald-500/80 hover:bg-emerald-500"
                />
            </div>
        </main>
    );
};
