import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Circuits (e2e)', (): void => {
  let app: INestApplication;
  const apiKey: string = process.env.API_KEY;

  beforeEach(async (): Promise<void> => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/circuits (GET)', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/circuits')
      .set('api-key', apiKey);

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body).toHaveLength(22);
  });

  it('/circuits/:id (GET)', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/circuits/14')
      .set('api-key', apiKey);

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(14);
    expect(response.body.circuit_name).toMatch(/spa-francorchamps/i);
  });
});
