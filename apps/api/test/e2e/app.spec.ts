import type { INestApplication } from "@nestjs/common";
import { Test, type TestingModule } from "@nestjs/testing";

import { AppModule } from "@/app.module";
import { setupApp } from "@/app.setup";
import request from "supertest";
import type { App } from "supertest/types";

describe("AppController (e2e)", () => {
    let app: INestApplication<App>;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        setupApp(app);
        await app.init();
    });

    afterEach(async () => {
        await app.close();
    });

    it("/api/v1 (GET)", () => {
        return request(app.getHttpServer()).get("/api/v1").expect(200).expect({ message: "Hello world 🌎" });
    });
});
