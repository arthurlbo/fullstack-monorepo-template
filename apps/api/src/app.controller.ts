import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

import { AppService } from "./app.service";

@ApiTags("App")
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @ApiOperation({ summary: "Hello World" })
    @ApiOkResponse({ description: "Returns a greeting message" })
    getHello(): { message: string } {
        return this.appService.getHello();
    }
}
