import type { INestApplication } from "@nestjs/common";
import { Test, type TestingModule } from "@nestjs/testing";
import request from "supertest";
import type { App } from "supertest/types";

import { AppModule } from "@/app.module";
import { setupApp } from "@/app.setup";

describe("App (e2e)", () => {
    let app: INestApplication<App>;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        setupApp(app);
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it("/health (GET)", () => {
        return request(app.getHttpServer()).get("/health").expect(200);
    });
});
