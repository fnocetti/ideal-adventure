import { FavoriteDBO } from '../dbo/favorite.dbo';

export interface Data {
  favorites: FavoriteDBO[];
}

export const Db = Symbol.for('Db');
export interface Db {
  data: Data;
  read(): Promise<void>;
  write(): Promise<void>;
}
