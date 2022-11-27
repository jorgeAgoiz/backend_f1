import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Teams (e2e)', (): void => {
  let app: INestApplication;
  const apiKey: string = process.env.API_KEY;

  beforeEach(async (): Promise<void> => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/teams (GET) OK', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/teams')
      .set('api-key', apiKey);

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body).toHaveLength(10);
  });

  it('/teams/:id (GET) OK', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/teams/7')
      .set('api-key', apiKey);

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(7);
    expect(response.body.name).toMatch(/mclaren/i);
  });

  it('/teams/:id (GET) NOT FOUND', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/teams/999')
      .set('api-key', apiKey);

    expect(response.status).toEqual(404);
    expect(response.body.error).toEqual('Not Found');
  });

  afterEach(async () => {
    await app.close();
  });
});
