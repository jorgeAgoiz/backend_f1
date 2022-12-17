import { INestApplication } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Grid (e2e)', (): void => {
  let app: INestApplication;
  const apiKey: string = process.env.API_KEY;

  beforeEach(async (): Promise<void> => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/grand-prix/best-results/:id (GET) OK', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/grand-prix/best-results/1')
      .set('api-key', apiKey);

    expect(response.status).toEqual(200);
    expect(Object.keys(response.body)).toEqual([
      'driver',
      'victories',
      'podiums',
      'polePositions',
    ]);
    expect(response.body.driver).toMatchObject({
      id: expect.any(Number),
      name: expect.any(String),
      dorsal_number: expect.any(Number),
      birthday: expect.any(String),
      country: expect.any(String),
      picture: expect.any(String),
    });
    expect(response.body.victories[0]).toMatchObject({
      driver_name: expect.any(String),
      circuit_gp_name: expect.any(String),
      race_position: expect.any(Number),
    });
    expect(response.body.podiums[0]).toMatchObject({
      driver_name: expect.any(String),
      circuit_gp_name: expect.any(String),
      race_position: expect.any(Number),
    });
    expect(response.body.polePositions[0]).toMatchObject({
      circuit_gp_name: expect.any(String),
      driver_name: expect.any(String),
      grid_position: expect.any(Number),
      grid_type_grid: expect.any(String),
    });
  });

  it('/grand-prix/best-results/:id (GET) BAD REQUEST', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/grand-prix/best-results/7')
      .set('api-key', 'wrongApiKey');

    expect(response.status).toEqual(401);
  });

  it('/grand-prix/best-results/:id (GET) DRIVER NOT FOUND', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/grand-prix/best-results/99')
      .set('api-key', apiKey);

    expect(response.status).toEqual(404);
  });
});
