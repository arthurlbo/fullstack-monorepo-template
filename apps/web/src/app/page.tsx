import type { JSX } from "react";

import { Home } from "@/features/home";

export const dynamic = "force-static";

export default function Page(): JSX.Element {
    return <Home />;
}
