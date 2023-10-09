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
    describe('if the user does not provide a session token', () => {
      it('should return a 401', async () => {
        await request(app.getHttpServer())
          .post('/favorites')
          .send({
            bookId: 1,
          })
          .expect(401);

        expect(dummyStore).toEqual([]);
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

        expect(dummyStore).toEqual([{ user: 'user1', bookId: 1 }]);
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

        expect(dummyStore).toEqual([]);
      },
    );
  });

  describe('Get favorite', () => {
    it('should get a favorite by book id', async () => {
      dummyStore.push({ user: 'user1', bookId: 10 });
      const response = await request(app.getHttpServer())
        .get('/favorites/10')
        .set('authorization', 'user1')
        .expect(200);

      expect(response.body).toEqual({ bookId: 10 });
    });

    it('should return 404 if the favorite does not exist', () => {
      dummyStore.push({ user: 'user1', bookId: 10 });
      return request(app.getHttpServer())
        .get('/favorites/1')
        .set('authorization', 'user1')
        .expect(404);
    });

    it('should only return favorite of the user', () => {
      dummyStore.push({ user: 'user2', bookId: 10 });
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
