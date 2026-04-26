import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { HealthCheck, HealthCheckService, TypeOrmHealthIndicator } from "@nestjs/terminus";

@ApiTags("Health")
@Controller("health")
export class HealthController {
    constructor(
        private readonly health: HealthCheckService,
        private readonly db: TypeOrmHealthIndicator,
    ) {}

    @Get()
    @HealthCheck()
    @ApiOperation({ summary: "Check service health" })
    check() {
        return this.health.check([() => this.db.pingCheck("database")]);
    }
}
