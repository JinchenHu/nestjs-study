//entry file of the application which uses the core function
//NestFactory to create a Nest application instance
import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/exceptions/all-exception.filter';

const bootstrap = async () => {
  // return an application object
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  // start up HTTP listener
  await app.listen(3000);
};
bootstrap();
