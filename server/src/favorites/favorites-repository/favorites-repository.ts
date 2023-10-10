import { Inject, Injectable } from '@nestjs/common';
import { Db } from './../../database/db/db.interface';

@Injectable()
export class FavoritesRepository {
  constructor(@Inject(Db) private db: Db) {}

  async find(user: string, bookId: number) {
    await this.db.read();
    return this.db.data.favorites.find(
      (f) => f.user === user && f.bookId === bookId,
    );
  }

  async save(user: string, bookId: number) {
    await this.db.read();
    this.db.data.favorites.push({ user, bookId });
    await this.db.write();
  }
}
