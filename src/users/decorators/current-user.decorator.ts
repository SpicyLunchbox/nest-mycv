import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  // the context is a wrapper for the request
  (data: never, context: ExecutionContext) => {
    // accesses the underlying request coming to the API
    const request = context.switchToHttp().getRequest();
    return request.CurrentUser;
  },
);
