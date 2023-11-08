import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session');

// the function to run on startup is called bootstrap by convention
async function bootstrap() {
  // top level module is initialized here
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      keys: ['encryptionString'],
    }),
  );
  // global pipes are registered here.  You can use custom and out of the box pipes.
  // pipes will validate request data before it reaches a route handler.
  // the Nest provided ValidationPipe uses DTOs to validate incoming request payloads.
  // The Decorators in DTOs are used as validation rules. Decorators are found within the class-validator import
  // Validation pipe will use class-transformer (under the hood) to transform the inboud JSON object into the desired class,
  // it will then check the class against the decorators provided.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  // port is selected here
  await app.listen(3000);
}
// app is initialized here
bootstrap();
