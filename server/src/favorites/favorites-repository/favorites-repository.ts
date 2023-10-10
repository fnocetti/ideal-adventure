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

  async delete(token: string, bookId: number) {
    await this.db.read();
    const filtered = this.db.data.favorites.filter(
      (f) => !(f.user === token && f.bookId === bookId),
    );
    const didRemove = filtered.length < this.db.data.favorites.length;
    this.db.data.favorites = filtered;
    await this.db.write();
    return didRemove;
  }
}
