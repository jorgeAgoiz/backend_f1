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

  it('/sprint (GET) OK', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/sprint')
      .set('api-key', apiKey);

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        grand_prix: expect.any(Number),
        position: expect.any(Number),
        laps_disputed: expect.any(Number),
        average_speed: expect.any(Number),
        sprint_points: expect.any(Number),
      }),
    );
  });

  it('/sprint/driver/:id (GET) OK', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/sprint/driver/8')
      .set('api-key', apiKey);

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        sprint_grand_prix: expect.any(Number),
        sprint_position: expect.any(Number),
        sprint_laps_disputed: expect.any(Number),
        sprint_average_speed: expect.any(Number),
        sprint_sprint_points: expect.any(Number),
        driver_id: expect.any(Number),
        driver_name: expect.any(String),
        circuit_id: expect.any(Number),
        circuit_circuit_name: expect.any(String),
        team_name: expect.any(String),
        team_id: expect.any(Number),
      }),
    );
    expect(response.body[0].driver_id).toEqual(8);
  });

  it('/sprint/driver/:id (GET) NOT FOUND', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/sprint/driver/999')
      .set('api-key', apiKey);

    expect(response.status).toEqual(404);
    expect(response.body.error).toEqual('Not Found');
  });

  it('/sprint/circuit/:id (GET) OK', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/sprint/circuit/4')
      .set('api-key', apiKey);

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[12]).toEqual(
      expect.objectContaining({
        sprint_grand_prix: expect.any(Number),
        sprint_position: expect.any(Number),
        sprint_laps_disputed: expect.any(Number),
        sprint_average_speed: expect.any(Number),
        sprint_sprint_points: expect.any(Number),
        driver_id: expect.any(Number),
        driver_name: expect.any(String),
        circuit_id: expect.any(Number),
        circuit_circuit_name: expect.any(String),
        team_name: expect.any(String),
        team_id: expect.any(Number),
      }),
    );
    expect(response.body[0].circuit_id).toEqual(4);
  });

  it('/sprint/circuit/:id (GET) NOT FOUND', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/sprint/circuit/999')
      .set('api-key', apiKey);

    expect(response.status).toEqual(404);
    expect(response.body.error).toEqual('Not Found');
  });

  it('/sprint/team/:id (GET) OK', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/sprint/team/4')
      .set('api-key', apiKey);

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        sprint_grand_prix: expect.any(Number),
        sprint_position: expect.any(Number),
        sprint_laps_disputed: expect.any(Number),
        sprint_average_speed: expect.any(Number),
        sprint_sprint_points: expect.any(Number),
        driver_id: expect.any(Number),
        driver_name: expect.any(String),
        circuit_id: expect.any(Number),
        circuit_circuit_name: expect.any(String),
        team_name: expect.any(String),
        team_id: expect.any(Number),
      }),
    );
    expect(response.body[0].team_id).toEqual(4);
  });

  it('/sprint/circuit/:id (GET) NOT FOUND', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/sprint/circuit/999')
      .set('api-key', apiKey);

    expect(response.status).toEqual(404);
    expect(response.body.error).toEqual('Not Found');
  });
});
