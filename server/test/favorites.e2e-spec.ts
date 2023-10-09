import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import {
  dummyStore,
  resetDummyStore,
} from './../src/favorites/favorites.controller';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    resetDummyStore();
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

  describe('Get favorite', () => {
    it('should get a favorite by book id', async () => {
      dummyStore.push({ bookId: 10 });
      const response = await request(app.getHttpServer())
        .get('/favorites/10')
        .expect(200);

      expect(response.body).toEqual(dummyStore[0]);
    });

    it('should return 404 if the favorite does not exist', () => {
      dummyStore.push({ bookId: 10 });
      return request(app.getHttpServer()).get('/favorites/1').expect(404);
    });
  });
});
