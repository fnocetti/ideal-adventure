import { Module } from '@nestjs/common';
import { Db } from './db/db.interface';
import { TestingDb } from './testing-db/testing-db';

@Module({
  providers: [
    {
      provide: Db,
      useFactory: async () => {
        const { Low, Memory } = await import('lowdb');
        return new Low(new Memory(), { favorites: [] });
      },
    },
    TestingDb,
  ],
  exports: [Db],
})
export class DatabaseModule {}
