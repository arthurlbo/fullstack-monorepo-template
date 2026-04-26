import { LinkButton } from "@/shared/components/ui";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";

export const dynamic = "force-static";

export default function Home() {
    return (
        <main className="flex flex-col items-center gap-6 text-center text-primary-100">
            <h1 className="font-bold text-2xl">Hello Dev</h1>

            <p className="max-w-md">
                This is a modern Full-stack monorepo template designed to accelerate your web development workflow.
            </p>

            <div className="mt-2 flex items-center gap-2">
                <LinkButton
                    href="https://github.com/arthurlbo/fullstack-monorepo-template"
                    label="Explore Documentation"
                    icon={IconBrandGithub}
                    className="border border-border bg-transparent text-primary-100 hover:bg-border"
                />
                <LinkButton
                    href="https://www.linkedin.com/in/arthurlbo/"
                    label="Who Am I?"
                    icon={IconBrandLinkedin}
                    className="bg-emerald-500/80 text-primary-100 hover:bg-emerald-500"
                />
            </div>
        </main>
    );
}
