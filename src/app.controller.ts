import { Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('id/:id')
  getId(@Param() params): string {
    console.log(params.id);

    return `This action returns a #${params.id} cat`;
  }

  @Get('ab*ab')
  getWild(): string {
    return 'This is wildcards matching';
  }

  @Post()
  create(): string {
    return 'This action adds a new cat';
  }

  @Delete()
  delete(): string {
    return 'This action deletes a new cat';
  }
}
