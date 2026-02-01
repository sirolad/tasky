import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
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
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
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

  it('/v1/tasks/:id (GET)', async () => {
    // 1. Create a task
    const title = `Single Task ${Date.now()}`;
    const createRes = await request(app.getHttpServer())
      .post('/v1/tasks')
      .send({ title })
      .expect(201);
    const taskId = createRes.body.data.id;

    // 2. Fetch the task
    return request(app.getHttpServer())
      .get(`/v1/tasks/${taskId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.data.id).toBe(taskId);
        expect(res.body.data.title).toBe(title);
      });
  });

  it('/v1/tasks/:id (GET) - Not Found', () => {
    return request(app.getHttpServer())
      .get('/v1/tasks/non-existent-id')
      .expect(404);
  });

  it('/v1/tasks/:id/assign/:userId (POST)', async () => {
    // 1. Create a user
    const userRes = await request(app.getHttpServer())
      .post('/v1/users')
      .send({ name: 'Assignee', email: `assignee-${Date.now()}@example.com` })
      .expect(201);
    const userId = userRes.body.data.id;

    // 2. Create a task
    const title = `Task to Assign ${Date.now()}`;
    const taskRes = await request(app.getHttpServer())
      .post('/v1/tasks')
      .send({ title })
      .expect(201);
    const taskId = taskRes.body.data.id;

    // 3. Assign task to user
    return request(app.getHttpServer())
      .post(`/v1/tasks/${taskId}/assign/${userId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.data.id).toBe(taskId);
        expect(res.body.data.assignedToId).toBe(userId);
        expect(res.body.data.assignedUser).toBeDefined();
        expect(res.body.data.assignedUser.id).toBe(userId);
      });
  });

  it('/v1/tasks/:id (DELETE)', async () => {
    // 1. Create a task
    const createRes = await request(app.getHttpServer())
      .post('/v1/tasks')
      .send({ title: `Delete Me ${Date.now()}` })
      .expect(201);
    const taskId = createRes.body.data.id;

    // 2. Delete the task
    await request(app.getHttpServer())
      .delete(`/v1/tasks/${taskId}`)
      .expect(204);

    // 3. Verify it's gone
    return request(app.getHttpServer())
      .get(`/v1/tasks/${taskId}`)
      .expect(404);
  });
});
