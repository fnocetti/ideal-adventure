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

interface FavoriteDBO {
  user: string;
  bookId: number;
}

export let dummyStore: FavoriteDBO[] = [];
export function resetDummyStore() {
  dummyStore = [];
}
@Controller('favorites')
export class FavoritesController {
  @Get(':bookId')
  async getFavorite(
    @Param('bookId', ParseIntPipe) bookId: number,
    @Headers('Authorization') token?: string,
  ) {
    if (typeof token === 'undefined') {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const favorite = dummyStore.find(
      (f) => f.user === token && f.bookId === bookId,
    );

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

    dummyStore.push({ ...favorite, user: token });
  }
}
