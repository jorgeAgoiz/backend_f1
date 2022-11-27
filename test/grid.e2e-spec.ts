import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
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

  it('/grid (GET) OK', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/grid')
      .set('api-key', apiKey);

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        grand_prix: expect.any(Number),
        position: expect.any(Number),
        type_grid: expect.any(String),
      }),
    );
  });

  it('/grid/type-grid/:type_grid (GET) OK', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/grid/type-grid/race')
      .set('api-key', apiKey);

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        grand_prix: expect.any(Number),
        position: expect.any(Number),
        type_grid: expect.any(String),
      }),
    );
    expect(response.body[0].type_grid).toMatch(/race/i);
  });

  it('/grid/type-grid/:type_grid (GET) NOT FOUND', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/grid/type-grid/race/test')
      .set('api-key', apiKey);

    expect(response.status).toEqual(404);
    expect(response.body.error).toEqual('Not Found');
  });

  it('/grid/driver/:id (GET) OK', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/grid/driver/6')
      .set('api-key', apiKey);

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        circuit_circuit_name: expect.any(String),
        circuit_id: expect.any(Number),
        driver_id: expect.any(Number),
        driver_name: expect.any(String),
        grid_grand_prix: expect.any(Number),
        grid_position: expect.any(Number),
        grid_type_grid: expect.any(String),
        team_id: expect.any(Number),
        team_name: expect.any(String),
      }),
    );
  });

  it('/grid/driver/:id (GET) NOT FOUND', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/grid/driver/999')
      .set('api-key', apiKey);

    expect(response.status).toEqual(404);
    expect(response.body.error).toEqual('Not Found');
  });

  it('/grid/circuit/:id (GET) OK', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/grid/circuit/16')
      .set('api-key', apiKey);

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        circuit_circuit_name: expect.any(String),
        circuit_id: expect.any(Number),
        driver_id: expect.any(Number),
        driver_name: expect.any(String),
        grid_grand_prix: expect.any(Number),
        grid_position: expect.any(Number),
        grid_type_grid: expect.any(String),
        team_id: expect.any(Number),
        team_name: expect.any(String),
      }),
    );
  });

  it('/grid/circuit/:id (GET) NOT FOUND', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/grid/circuit/999')
      .set('api-key', apiKey);

    expect(response.status).toEqual(404);
    expect(response.body.error).toEqual('Not Found');
  });

  it('/grid/team/:id (GET) OK', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/grid/team/6')
      .set('api-key', apiKey);

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        circuit_circuit_name: expect.any(String),
        circuit_id: expect.any(Number),
        driver_id: expect.any(Number),
        driver_name: expect.any(String),
        grid_grand_prix: expect.any(Number),
        grid_position: expect.any(Number),
        grid_type_grid: expect.any(String),
        team_id: expect.any(Number),
        team_name: expect.any(String),
      }),
    );
  });

  it('/grid/team/:id (GET) NOT FOUND', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/grid/team/999')
      .set('api-key', apiKey);

    expect(response.status).toEqual(404);
    expect(response.body.error).toEqual('Not Found');
  });

  afterEach(async () => {
    await app.close();
  });
});
