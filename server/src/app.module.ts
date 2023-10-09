import { Module, ValidationPipe } from '@nestjs/common';
import { FavoritesModule } from './favorites/favorites.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [FavoritesModule],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
