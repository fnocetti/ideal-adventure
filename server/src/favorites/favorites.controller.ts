import {
  Body,
  Controller,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AddFavoriteDto } from './AddFavoriteDto';
import { FavoritesRepository } from './favorites-repository/favorites-repository';

@Controller('favorites')
export class FavoritesController {
  constructor(private favorites: FavoritesRepository) {}

  @Get(':bookId')
  async getFavorite(
    @Param('bookId', ParseIntPipe) bookId: number,
    @Headers('Authorization') token?: string,
  ) {
    if (typeof token === 'undefined') {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const favorite = this.favorites.find(token, bookId);

    if (!favorite) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return { bookId: favorite.bookId };
  }

  @Post()
  async addFavorite(
    @Body() favorite: AddFavoriteDto,
    @Headers('Authorization') token?: string,
  ) {
    if (typeof token === 'undefined') {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    this.favorites.save(token, favorite.bookId);
  }
}
