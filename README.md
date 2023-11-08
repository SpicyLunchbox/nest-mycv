Notes are found in:
Main.ts
App.module.ts
Users.module.ts
Users.controller.ts
Users.service.ts
Auth.service.ts
User.entity.ts
Serialize.interceptor.ts
Current-user.interceptor.ts
Current-user.decorator.ts
Auth.guard.ts

Our Server Auth Explained:

1. client will make request to app to signup
2. server will check, then create new user and response with cookie that contains userID
3. future requests will include cookie. Cookie will be verified by server

cookie functionality is initially setup within the main.ts file.
