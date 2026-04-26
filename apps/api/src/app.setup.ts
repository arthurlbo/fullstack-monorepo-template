import compression from "compression";
import helmet from "helmet";

import { type INestApplication, ValidationPipe, VersioningType } from "@nestjs/common";

export function setupApp(app: INestApplication): void {
    app.use(helmet());
    app.use(compression());

    app.setGlobalPrefix("api", { exclude: ["health"] });

    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: "1",
    });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );
}
