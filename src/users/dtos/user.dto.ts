import { Expose } from 'class-transformer';

// used for outgoing user payloads
// is used with the custome serialize interceptor at the controller layer
export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;
}
