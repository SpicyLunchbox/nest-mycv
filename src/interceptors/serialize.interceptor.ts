import {
  CallHandler,
  NestInterceptor,
  ExecutionContext,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

interface ClassConstructor {
  new (...args: any[]): object;
}

export function Serialize(dto: ClassConstructor) {
  // new intercetpor is created and bound here
  return UseInterceptors(new SerializeInterceptor(dto));
}

// extends would make the new class a child
// implements helps to make sure the new class satisfies all the requirements of the class it is implementing
export class SerializeInterceptor implements NestInterceptor {
  // dto is passed in for comparison against handler data seen below
  constructor(private dto: ClassConstructor) {}

  // the context is a wrapper for the request
  // handler is kind of like the route handler within the controller
  // an observable represents a stream of data that can be subscribed to
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // here you run something before a request is handled by the handler
    return handler.handle().pipe(
      map((data: any) => {
        // here you run something before the response is sent out
        return plainToInstance(this.dto, data, {
          // removes properties from data that are not flagged with @Expose inside of dto
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
