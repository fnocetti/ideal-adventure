import { Module } from '@nestjs/common';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [FavoritesModule],
})
export class AppModule {}
