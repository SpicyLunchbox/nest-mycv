import { CanActivate, ExecutionContext } from '@nestjs/common';

// CanActivate requires the function to return a truthy or falsy value
// a falsy return value will block execution of the route handler & return with a 403
export class AuthGuard implements CanActivate {
  // the context is a wrapper for the request
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    return request.session.userId;
  }
}
