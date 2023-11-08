import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  // imports resources from other modules into this module
  // if you want to inject dependencies from a different module into this one, you would list the injectable's home module here
  // below the User entity is connected to TypeORM in the imports statement
  imports: [TypeOrmModule.forFeature([User])],
  // lists controllers within module
  controllers: [UsersController],
  // provides classes / services that can be used as dependencies / injectables within this module
  providers: [
    UsersService,
    AuthService,
    // the below sets up a globally scoped interceptor that runs throughout the app, including other modules
    // this is confusing, but remember that it as a way to set up a global interceptor that is applied to all controllers
    { provide: APP_INTERCEPTOR, useClass: CurrentUserInterceptor },
  ],
})
export class UsersModule {}
