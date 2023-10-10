import { Module } from '@nestjs/common';
import { Db } from './db/db.interface';
import { TestingDb } from './testing-db/testing-db';
import { join } from 'path';
import { DEFAULT_DATA } from './default-data';

@Module({
  providers: [
    {
      provide: Db,
      useFactory: async () => {
        const { Low } = await import('lowdb');
        const { JSONFile } = await import('lowdb/node');

        const file = join(process.cwd(), 'db.json');
        const adapter = new JSONFile(file);
        return new Low(adapter, DEFAULT_DATA);
      },
    },
    TestingDb,
  ],
  exports: [Db],
})
export class DatabaseModule {}
