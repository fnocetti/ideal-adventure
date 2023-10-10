import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AddFavoriteDto } from './AddFavoriteDto';
import { FavoritesRepository } from './favorites-repository/favorites-repository';
import { User } from './../authorization/user/user.decorator';

@Controller('favorites')
export class FavoritesController {
  constructor(private favorites: FavoritesRepository) {}

  @Get(':bookId')
  async getFavorite(
    @Param('bookId', ParseIntPipe) bookId: number,
    @User() token: string,
  ) {
    const favorite = await this.favorites.find(token, bookId);

    if (!favorite) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return { bookId: favorite.bookId };
  }

  @Post()
  async addFavorite(@Body() favorite: AddFavoriteDto, @User() token?: string) {
    await this.favorites.save(token, favorite.bookId);
  }

  @Delete(':bookId')
  async deleteFavorite(
    @Param('bookId', ParseIntPipe) bookId: number,
    @User() token: string,
  ) {
    const removed = await this.favorites.delete(token, bookId);
    if (!removed) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
}
