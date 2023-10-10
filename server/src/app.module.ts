import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { FavoritesModule } from './favorites/favorites.module';
import { APP_PIPE } from '@nestjs/core';
import { AuthorizationModule } from './authorization/authorization.module';
import { AuthorizationMiddleware } from './authorization/authorization-middleware/authorization.middleware';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [FavoritesModule, AuthorizationModule, DatabaseModule],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorizationMiddleware).forRoutes('*');
  }
}
