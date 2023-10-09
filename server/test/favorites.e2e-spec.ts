import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { dummyStore } from './../src/favorites/favorites.controller';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Add favorite', () => {
    it('should add a favorite', async () => {
      await request(app.getHttpServer())
        .post('/favorites')
        .send({
          bookId: 1,
        })
        .expect(201);

      expect(dummyStore).toEqual([{ bookId: 1 }]);
    });
  });
});
