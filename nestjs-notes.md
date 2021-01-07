# NestJs

Nest is a framework for building efficient, scalabel Node.js server-side aplications

## Controllers

Controllers are responsible for handling incoming requests and returning responses to the client

### Routing

The routing mechanism controls which controller receives which requests. Frequently, each controller has more than one route, and different routes can perform different actions.

|  DECORATORS   |                         DESCRIPTION                          |
| :-----------: | :----------------------------------------------------------: |
| @Controller() |                group a set of related routes                 |
|    @Get()     | create a handler for a specific endpoint for HTTP GET requests |
|    @Post()    |                         POST action                          |
|    @Put()     |                          PUT action                          |
|   @Delete()   |                        DELETE action                         |
|   @Patch()    |                         PATCH action                         |
|     @All      |           Define an endpoint handler all requests            |
|  @Options()   |                                                              |
|   @Header()   |               Define a custom response header                |
|  @Redirect()  |                                                              |
|   @Params()   |                                                              |
|               |                                                              |
|               |                                                              |
|               |                                                              |
|               |                                                              |
|               |                                                              |
|               |                                                              |
|               |                                                              |
|               |                                                              |



```typescript
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// decorator to define a controller
@Controller('cat') // define prefix of the route: /cat 
export class AppController {
  constructor(private readonly appService: AppService) {}

  // If not defined this is current root path /cat
  // otherwise, say, @Get('mew'), the route  /cat/mew
  @Get() //postfix
  getHello(): string {
    return this.appService.getHello();
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
```

### Request Object

|       DECORATORS        |          PROPERTIES           |
| :---------------------: | :---------------------------: |
|   @Request(), @Req()    |              req              |
|  @Response(), @Res()`   |              res              |
|         @Next()         |             next              |
|       @Session()        |          req.session          |
|  @Param(key?: string)   |  req.params/req.params[key]   |
|   @Body(key?: string)   |    req.body/req.body[key]     |
|  @Query(key?: string)   |   req.query/req.query[key]    |
| @Headers(name?: string) | req.headers/req.headers[name] |
|          @Ip()          |            req.ip             |
|      @HostParam()       |           req.hosts           |

### Route Wildcard

Using asterisk `*` will match any combination of characters

```typescript
@Get('ab*cd')
findAll() {
  return 'This route uses a wildcard';
}
```

### Status Code

As mentioned, the response **status code** is always **200** by default, except for POST requests which are **201**. We can easily change this behavior by adding the `@HttpCode(...)` decorator at a handler level.

```typescript
@Post()
@HttpCode(204)
create() {
  return 'This action adds a new cat';
}
```

### Headers

Customize our own response headers

```typescript
@Post()
@Header('Cache-Control', 'none')
create() {
  return 'This action adds a new cat';
}
```

### Redirection

`Redirect(url, statusCode)` where status code is optinal with default value set to 302

```typescript
@Get('docs')
@Redirect('https://docs.nestjs.com', 301)
getDocs(@Query('version') version) {
  if (version && version === '5') {
    return { url: 'https://docs.nestjs.com/v5/', statusCode: 302 }; //this will override the redirection
  }
}
```

### Route Parameters

Capture the dynamic value at the position in the request URL

```typescript
@Get(':id')
findOne(@Param() params): string {
  console.log(params.id);
  return `This action returns a #${params.id} cat`;
}

//or
@Get(':id')
findOne(@Param('id') id: string): string {
  return `This action returns a #${id} cat`;
}
```

### Sub-domain Routing

The `@Controller` decorator can take a `host` option to require that the HTTP host of the incoming requests matches some specific value.

```typescript
@Controller({ host: 'admin.example.com' })
export class AdminController {
  @Get()
  index(): string {
    return 'Admin page';
  }
}
```

### Example

```typescript
import { Controller, Get, Query, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CreateCatDto, UpdateCatDto, ListAllEntities } from './dto';

@Controller('cats')
export class CatsController {
  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(@Query() query: ListAllEntities) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
```

