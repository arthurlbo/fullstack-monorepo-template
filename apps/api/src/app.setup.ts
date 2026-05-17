import { type INestApplication, VersioningType } from "@nestjs/common";

import compression from "compression";
import helmet from "helmet";

export function setupApp(app: INestApplication): void {
    app.use(helmet());
    app.use(compression());

    app.setGlobalPrefix("api", { exclude: ["health"] });

    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: "1",
    });
}
