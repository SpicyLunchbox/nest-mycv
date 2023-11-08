import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';

@Module({
  // sub modules are listed in imports, imports resources from other modules into this module
  imports: [
    // the below establishes the connection between TypeORM & the desired database
    // TypeORM is a library that is used by Nest.js to communcate with databases
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Report],
      synchronize: true,
    }),
    UsersModule,
    ReportsModule,
  ],
  // controllers listed here will be created when this module is initialized
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
