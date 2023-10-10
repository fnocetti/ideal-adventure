import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { Db } from './../src/database/db/db.interface';
import { TestingDb } from './../src/database/testing-db/testing-db';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const request = require('supertest');

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const testingDb = new TestingDb();

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(Db)
      .useValue(testingDb)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    testingDb.reset();
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

        expect(testingDb.data.favorites).toEqual([]);
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

        expect(testingDb.data.favorites).toEqual([
          { user: 'user1', bookId: 1 },
        ]);
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
          .set('authorization', 'user1')
          .send({
            [prop]: value,
          })
          .expect(400);

        expect(testingDb.data.favorites).toEqual([]);
      },
    );
  });

  describe('Get favorite', () => {
    it('should get a favorite by book id', async () => {
      testingDb.data.favorites.push({ user: 'user1', bookId: 10 });
      const response = await request(app.getHttpServer())
        .get('/favorites/10')
        .set('authorization', 'user1')
        .expect(200);

      expect(response.body).toEqual({ bookId: 10 });
    });

    it('should return 404 if the favorite does not exist', () => {
      testingDb.data.favorites.push({ user: 'user1', bookId: 10 });
      return request(app.getHttpServer())
        .get('/favorites/1')
        .set('authorization', 'user1')
        .expect(404);
    });

    it('should only return favorite of the user', () => {
      testingDb.data.favorites.push({ user: 'user2', bookId: 10 });
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

  describe('Delete a favorite', () => {
    it('should delete a favorite by book id', async () => {
      testingDb.data.favorites.push({ user: 'user1', bookId: 10 });
      await request(app.getHttpServer())
        .delete('/favorites/10')
        .set('authorization', 'user1')
        .expect(200);

      expect(testingDb.data.favorites).toEqual([]);
    });

    it('should return 404 if the favorite does not exist', () => {
      testingDb.data.favorites.push({ user: 'user1', bookId: 10 });
      return request(app.getHttpServer())
        .delete('/favorites/1')
        .set('authorization', 'user1')
        .expect(404);
    });

    it('should only delete favorites of the user', async () => {
      testingDb.data.favorites.push({ user: 'user2', bookId: 10 });
      await request(app.getHttpServer())
        .delete('/favorites/10')
        .set('authorization', 'user1')
        .expect(404);

      expect(testingDb.data.favorites).toEqual([{ user: 'user2', bookId: 10 }]);
    });

    describe('if the user does not provide a session token', () => {
      it('should return 401', async () => {
        await request(app.getHttpServer()).delete('/favorites/1').expect(401);
      });
    });
  });
});
