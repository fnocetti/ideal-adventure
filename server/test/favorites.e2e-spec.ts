import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import {
  memoryStore,
  resetMemoryStoreStore,
} from './../src/favorites/favorites-repository/favorites-repository';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    resetMemoryStoreStore();
  });

  describe('Add favorite', () => {
    describe('if the user does not provide a session token', () => {
      it('should return a 401', async () => {
        await request(app.getHttpServer())
          .post('/favorites')
          .send({
            bookId: 1,
          })
          .expect(401);

        expect(memoryStore).toEqual([]);
      });
    });

    describe('if the user provides a session token', () => {
      it('should add a favorite for the user', async () => {
        await request(app.getHttpServer())
          .post('/favorites')
          .set('authorization', 'user1')
          .send({
            bookId: 1,
          })
          .expect(201);

        expect(memoryStore).toEqual([{ user: 'user1', bookId: 1 }]);
      });
    });

    it.each([
      ['badProp', 1],
      ['bookId', 'bad value'],
    ] as const)(
      'should return a validation error if the body is not correct',
      async ([prop, value]) => {
        await request(app.getHttpServer())
          .post('/favorites')
          .send({
            [prop]: value,
          })
          .expect(400);

        expect(memoryStore).toEqual([]);
      },
    );
  });

  describe('Get favorite', () => {
    it('should get a favorite by book id', async () => {
      memoryStore.push({ user: 'user1', bookId: 10 });
      const response = await request(app.getHttpServer())
        .get('/favorites/10')
        .set('authorization', 'user1')
        .expect(200);

      expect(response.body).toEqual({ bookId: 10 });
    });

    it('should return 404 if the favorite does not exist', () => {
      memoryStore.push({ user: 'user1', bookId: 10 });
      return request(app.getHttpServer())
        .get('/favorites/1')
        .set('authorization', 'user1')
        .expect(404);
    });

    it('should only return favorite of the user', () => {
      memoryStore.push({ user: 'user2', bookId: 10 });
      return request(app.getHttpServer())
        .get('/favorites/10')
        .set('authorization', 'user1')
        .expect(404);
    });

    describe('if the user does not provide a session token', () => {
      it('should return 401', async () => {
        await request(app.getHttpServer()).get('/favorites/1').expect(401);
      });
    });
  });
});
