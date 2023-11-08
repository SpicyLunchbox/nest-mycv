import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  // context is a wrapper around the incoming request
  // handler is a reference to the actual route handler
  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};

    if (userId) {
      const user = await this.usersService.findOne(userId);
      // by assigning the user to the request object, the CurrentUser custom decorator now has access to the user object
      // this is all done because custom decorators don't have access to the Dependency Injection system
      // thus, an interceptor is needed to add the extra logic to access the usersService
      request.CurrentUser = user;
    }

    // just run the route handler
    return handler.handle();
  }
}
