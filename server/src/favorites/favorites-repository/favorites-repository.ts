import { Injectable } from '@nestjs/common';

interface FavoriteDBO {
  user: string;
  bookId: number;
}
export let memoryStore: FavoriteDBO[] = [];
export function resetMemoryStoreStore() {
  memoryStore = [];
}

@Injectable()
export class FavoritesRepository {
  find(user: string, bookId: number) {
    return memoryStore.find((f) => f.user === user && f.bookId === bookId);
  }

  save(user: string, bookId: number) {
    memoryStore.push({ user, bookId });
  }
}
