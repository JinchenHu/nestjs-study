import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseFilters,
  ForbiddenException,
  ParseIntPipe,
  DefaultValuePipe,
  HttpStatus,
  Query,
  Body,
  ParseBoolPipe,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cat.service';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { Cat } from './interfaces/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';

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

  //TODO: exception response body does not matching what's like on the docs no error message
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
  // TODO: the create() receives Cat interface in the service, no implementation
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  // TODO: why does this exception has low priority than the controller-scoped exception filter.
  // TODO: this exception extends HttpException other than ExceptionFilter
  @Post('exception')
  async createException() {
    throw new ForbiddenException();
  }

  @Delete()
  delete(): string {
    return 'This action deletes a new cat';
  }
}
