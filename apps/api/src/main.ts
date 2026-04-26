import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { apiEnv } from "@repo/env";

import { AppModule } from "./app.module";
import { setupApp } from "./app.setup";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    setupApp(app);

    app.enableCors({
        origin: apiEnv.ALLOWED_ORIGINS.split(","),
        credentials: true,
    });

    const swaggerConfig = new DocumentBuilder()
        .setTitle("API")
        .setDescription("API documentation")
        .setVersion("1.0")
        .addBearerAuth()
        .build();
    SwaggerModule.setup("api/docs", app, SwaggerModule.createDocument(app, swaggerConfig));

    app.enableShutdownHooks();

    await app.listen(apiEnv.API_PORT ?? 3001);
}

void bootstrap();
