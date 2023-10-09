import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
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
    const favorite = dummyStore.find((f) => f.bookId === bookId);
    if (!favorite) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return favorite;
  }

  @Post()
  async addFavorite(@Body() favorite: FavoriteDTO) {
    dummyStore.push(favorite);
  }
}
