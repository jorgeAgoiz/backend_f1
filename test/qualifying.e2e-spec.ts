import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Qualifyings (e2e)', (): void => {
  let app: INestApplication;
  const apiKey: string = process.env.API_KEY;

  beforeEach(async (): Promise<void> => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/qualifying (GET) OK', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/qualifying')
      .set('api-key', apiKey);

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        average_speed: expect.any(Number),
        grand_prix: expect.any(Number),
        position: expect.any(Number),
        laps: expect.any(Number),
        fast_lap: expect.any(Number),
        qf_number: expect.any(Number),
      }),
    );
  });

  it('/qualifying/driver/:id (GET) OK', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/qualifying/driver/12')
      .set('api-key', apiKey);

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        circuit_circuit_name: expect.any(String),
        circuit_id: expect.any(Number),
        driver_id: expect.any(Number),
        driver_name: expect.any(String),
        qf_average_speed: expect.any(Number),
        qf_fast_lap: expect.any(Number),
        qf_qf_number: expect.any(Number),
        qf_grand_prix: expect.any(Number),
        qf_laps: expect.any(Number),
        qf_position: expect.any(Number),
        team_id: expect.any(Number),
        team_name: expect.any(String),
      }),
    );
  });

  it('/qualifying/driver/:id (GET) NOT FOUND', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/qualifying/driver/999')
      .set('api-key', apiKey);

    expect(response.status).toEqual(404);
    expect(response.body.error).toEqual('Not Found');
  });

  it('/qualifying/circuit/:id (GET) OK', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/qualifying/circuit/16')
      .set('api-key', apiKey);

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        circuit_circuit_name: expect.any(String),
        circuit_id: expect.any(Number),
        driver_id: expect.any(Number),
        driver_name: expect.any(String),
        qf_average_speed: expect.any(Number),
        qf_fast_lap: expect.any(Number),
        qf_qf_number: expect.any(Number),
        qf_grand_prix: expect.any(Number),
        qf_laps: expect.any(Number),
        qf_position: expect.any(Number),
        team_id: expect.any(Number),
        team_name: expect.any(String),
      }),
    );
  });

  it('/qualifying/circuit/:id (GET) NOT FOUND', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/qualifying/circuit/999')
      .set('api-key', apiKey);

    expect(response.status).toEqual(404);
    expect(response.body.error).toEqual('Not Found');
  });

  it('/qualifying/team/:id (GET) OK', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/qualifying/team/6')
      .set('api-key', apiKey);

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        circuit_circuit_name: expect.any(String),
        circuit_id: expect.any(Number),
        driver_id: expect.any(Number),
        driver_name: expect.any(String),
        qf_average_speed: expect.any(Number),
        qf_fast_lap: expect.any(Number),
        qf_qf_number: expect.any(Number),
        qf_grand_prix: expect.any(Number),
        qf_laps: expect.any(Number),
        qf_position: expect.any(Number),
        team_id: expect.any(Number),
        team_name: expect.any(String),
      }),
    );
  });

  it('/qualifying/team/:id (GET) NOT FOUND', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/qualifying/team/999')
      .set('api-key', apiKey);

    expect(response.status).toEqual(404);
    expect(response.body.error).toEqual('Not Found');
  });

  it('/qualifying/avg-speed/driver/:id (GET) OK', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/qualifying/avg-speed/driver/6')
      .set('api-key', apiKey);

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        circuit_circuit_name: expect.any(String),
        qf_average_speed: expect.any(Number),
        qf_qf_number: expect.any(Number),
      }),
    );
  });

  it('/qualifying/avg-speed/driver/:id (GET) NOT FOUND', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/qualifying/avg-speed/driver/999')
      .set('api-key', apiKey);

    expect(response.status).toEqual(404);
    expect(response.body.error).toEqual('Not Found');
  });

  it('/qualifying/laps-time/driver/:id (GET) OK', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/qualifying/laps-time/driver/6')
      .set('api-key', apiKey);

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        circuit_circuit_name: expect.any(String),
        qf_fast_lap: expect.any(Number),
        qf_qf_number: expect.any(Number),
      }),
    );
  });

  it('/qualifying/laps-time/driver/:id (GET) NOT FOUND', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/qualifying/laps-time/driver/999')
      .set('api-key', apiKey);

    expect(response.status).toEqual(404);
    expect(response.body.error).toEqual('Not Found');
  });

  it('/qualifying/positions/driver/:id (GET) OK', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/qualifying/positions/driver/6')
      .set('api-key', apiKey);

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        circuit_circuit_name: expect.any(String),
        qf_position: expect.any(Number),
        qf_qf_number: expect.any(Number),
      }),
    );
  });

  it('/qualifying/positions/driver/:id (GET) NOT FOUND', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/qualifying/positions/driver/999')
      .set('api-key', apiKey);

    expect(response.status).toEqual(404);
    expect(response.body.error).toEqual('Not Found');
  });

  afterEach(async () => {
    await app.close();
  });
});
