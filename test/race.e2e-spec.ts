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

  it('/race (GET) OK', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/race')
      .set('api-key', apiKey);

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        grand_prix: expect.any(Number),
        position: expect.any(Number),
        laps_disputed: expect.any(Number),
        average_speed: expect.any(Number),
        num_pit_stops: expect.any(Number),
        total_time: expect.any(Number),
        retired: expect.any(String),
        race_points: expect.any(Number),
      }),
    );
  });

  it('/race/driver/:id (GET) OK', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/race/driver/8')
      .set('api-key', apiKey);

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        race_grand_prix: expect.any(Number),
        race_position: expect.any(Number),
        race_laps_disputed: expect.any(Number),
        race_average_speed: expect.any(Number),
        race_num_pit_stops: expect.any(Number),
        race_total_time: expect.any(Number),
        race_retired: expect.any(String),
        race_race_points: expect.any(Number),
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

  it('/race/driver/:id (GET) NOT FOUND', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/race/driver/999')
      .set('api-key', apiKey);

    expect(response.status).toEqual(404);
    expect(response.body.error).toEqual('Not Found');
  });

  it('/race/circuit/:id (GET) OK', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/race/circuit/16')
      .set('api-key', apiKey);

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        race_grand_prix: expect.any(Number),
        race_position: expect.any(Number),
        race_laps_disputed: expect.any(Number),
        race_average_speed: expect.any(Number),
        race_num_pit_stops: expect.any(Number),
        race_total_time: expect.any(Number),
        race_retired: expect.any(String),
        race_race_points: expect.any(Number),
        driver_id: expect.any(Number),
        driver_name: expect.any(String),
        circuit_id: expect.any(Number),
        circuit_circuit_name: expect.any(String),
        team_name: expect.any(String),
        team_id: expect.any(Number),
      }),
    );
    expect(response.body[0].circuit_id).toEqual(16);
  });

  it('/race/circuit/:id (GET) NOT FOUND', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/race/circuit/999')
      .set('api-key', apiKey);

    expect(response.status).toEqual(404);
    expect(response.body.error).toEqual('Not Found');
  });

  it('/race/team/:id (GET) OK', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/race/team/6')
      .set('api-key', apiKey);

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        race_grand_prix: expect.any(Number),
        race_position: expect.any(Number),
        race_laps_disputed: expect.any(Number),
        race_average_speed: expect.any(Number),
        race_num_pit_stops: expect.any(Number),
        race_total_time: expect.any(Number),
        race_retired: expect.any(String),
        race_race_points: expect.any(Number),
        driver_id: expect.any(Number),
        driver_name: expect.any(String),
        circuit_id: expect.any(Number),
        circuit_circuit_name: expect.any(String),
        team_name: expect.any(String),
        team_id: expect.any(Number),
      }),
    );
    expect(response.body[0].team_id).toEqual(6);
  });

  it('/race/team/:id (GET) NOT FOUND', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/race/team/999')
      .set('api-key', apiKey);

    expect(response.status).toEqual(404);
    expect(response.body.error).toEqual('Not Found');
  });
});
