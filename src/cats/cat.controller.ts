import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  ForbiddenException,
  Get,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
  UseFilters,
  //UseInterceptors
} from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { CatsService } from './cat.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
@UseInterceptors(LoggingInterceptor)
@UseFilters(new HttpExceptionFilter())
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getHello(): string {
    return this.catsService.getHello();
  }

  @Get('all')
  async finAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get('some')
  async findAll(
    @Query('activeOnly', new DefaultValuePipe(false), ParseBoolPipe)
    activeOnly: boolean,
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
  ) {
    return `Default values will be provided for missing fields ${activeOnly} and ${page}`;
  }

  @Get('id')
  async findOneCat(@Query('id', ParseIntPipe) id: number) {
    return this.catsService.findOne(id);
  }

  @Get('id:id')
  // async findOne(@Param('id', ParseIntPipe) id: number): Promise<string> {
  //   return this.catsService.findOne(id);
  // }
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<string> {
    return this.catsService.findOne(id);
  }

  @Get('ab*ab')
  getWild(): string {
    return 'This is wildcards matching';
  }

  @Post()
  //Attach the role metadata (role is a key, [] is the value) to this action
  @Roles('admin')
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Post('exception')
  async createException() {
    throw new ForbiddenException();
  }

  @Delete()
  delete(): string {
    return 'This action deletes a new cat';
  }
}
