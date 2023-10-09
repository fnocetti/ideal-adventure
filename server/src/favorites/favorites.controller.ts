import { Controller, Post } from '@nestjs/common';

@Controller('favorites')
export class FavoritesController {
  @Post()
  async addFavorite() {
    //
  }
}
