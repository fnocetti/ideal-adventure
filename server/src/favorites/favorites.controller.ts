import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

interface FavoriteDTO {
  bookId: number;
}

export let dummyStore: FavoriteDTO[] = [];
export function resetDummyStore() {
  dummyStore = [];
}
@Controller('favorites')
export class FavoritesController {
  @Get(':bookId')
  async getFavorite(@Param('bookId', ParseIntPipe) bookId: number) {
    return dummyStore.find((favorite) => favorite.bookId === bookId);
  }

  @Post()
  async addFavorite(@Body() favorite: FavoriteDTO) {
    dummyStore.push(favorite);
  }
}
