import { IsNotEmpty } from 'class-validator';

export class AddFavoriteDto {
  @IsNotEmpty()
  bookId: number;
}
