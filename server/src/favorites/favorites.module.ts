import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesRepository } from './favorites-repository/favorites-repository';
import { DatabaseModule } from './../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [FavoritesController],
  providers: [FavoritesRepository],
})
export class FavoritesModule {}
