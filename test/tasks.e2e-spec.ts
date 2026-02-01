import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe, VersioningType } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { TransformInterceptor } from '../src/infrastructure/interceptors/transform.interceptor';
import { AllExceptionsFilter } from '../src/infrastructure/filters/all-exceptions.filter';
import { HttpAdapterHost } from '@nestjs/core';

describe('TaskController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
    });
    app.useGlobalInterceptors(new TransformInterceptor());
    app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/v1/tasks (POST)', () => {
    const title = `E2E Task ${Date.now()}`;
    return request(app.getHttpServer())
      .post('/v1/tasks')
      .send({ title, description: 'E2E Description' })
      .expect(201)
      .expect((res) => {
        expect(res.body.data.title).toBe(title);
        expect(res.body.data.id).toBeDefined();
      });
  });

  it('/v1/tasks (GET)', () => {
    return request(app.getHttpServer())
      .get('/v1/tasks')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body.data)).toBe(true);
      });
  });
});
