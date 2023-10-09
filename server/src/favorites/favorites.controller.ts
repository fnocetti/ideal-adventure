import { Body, Controller, Post } from '@nestjs/common';

interface FavoriteDTO {
  bookId: number;
}

export const dummyStore: FavoriteDTO[] = [];
@Controller('favorites')
export class FavoritesController {
  @Post()
  async addFavorite(@Body() favorite: FavoriteDTO) {
    dummyStore.push(favorite);
  }
}
