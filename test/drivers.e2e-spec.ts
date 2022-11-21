import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Drivers (e2e)', (): void => {
  let app: INestApplication;
  const apiKey: string = process.env.API_KEY;

  beforeEach(async (): Promise<void> => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/drivers (GET) OK', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/drivers')
      .set('api-key', apiKey);

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body).toHaveLength(30);
  });

  it('/drivers/:id (GET) OK', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/drivers/16')
      .set('api-key', apiKey);

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(16);
    expect(response.body.name).toMatch(/lewis hamilton/i);
  });

  it('/drivers/:id (GET) NOT FOUND', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/drivers/999')
      .set('api-key', apiKey);

    expect(response.status).toEqual(404);
    expect(response.body.error).toEqual('Not Found');
  });
});
