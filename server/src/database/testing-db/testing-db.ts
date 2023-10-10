import { Injectable } from '@nestjs/common';
import { Db } from '../db/db.interface';

@Injectable()
export class TestingDb implements Db {
  data: Db['data'];

  constructor() {
    this.reset();
  }

  read(): Promise<void> {
    return Promise.resolve();
  }

  write(): Promise<void> {
    return Promise.resolve();
  }

  reset() {
    this.data = { favorites: [] };
  }
}
