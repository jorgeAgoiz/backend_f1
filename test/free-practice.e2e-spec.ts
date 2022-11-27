import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Free Practices (e2e)', (): void => {
  let app: INestApplication;
  const apiKey: string = process.env.API_KEY;

  beforeEach(async (): Promise<void> => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/free-practice (GET) OK', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/free-practice')
      .set('api-key', apiKey);

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        grand_prix: expect.any(Number),
        fp_number: expect.any(Number),
        position: expect.any(Number),
        laps: expect.any(Number),
        fast_lap: expect.any(Number),
        average_speed: expect.any(Number),
      }),
    );
  });

  it('/free-practice/driver/:id (GET) OK', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/free-practice/driver/12')
      .set('api-key', apiKey);

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        circuit_circuit_name: expect.any(String),
        circuit_id: expect.any(Number),
        driver_id: expect.any(Number),
        driver_name: expect.any(String),
        fp_average_speed: expect.any(Number),
        fp_fast_lap: expect.any(Number),
        fp_fp_number: expect.any(Number),
        fp_grand_prix: expect.any(Number),
        fp_laps: expect.any(Number),
        fp_position: expect.any(Number),
        team_id: expect.any(Number),
        team_name: expect.any(String),
      }),
    );
  });

  it('/free-practice/driver/:id (GET) NOT FOUND', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/free-practice/driver/999')
      .set('api-key', apiKey);

    expect(response.status).toEqual(404);
    expect(response.body.error).toEqual('Not Found');
  });

  it('/free-practice/circuit/:id (GET) OK', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/free-practice/circuit/16')
      .set('api-key', apiKey);

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        circuit_circuit_name: expect.any(String),
        circuit_id: expect.any(Number),
        driver_id: expect.any(Number),
        driver_name: expect.any(String),
        fp_average_speed: expect.any(Number),
        fp_fast_lap: expect.any(Number),
        fp_fp_number: expect.any(Number),
        fp_grand_prix: expect.any(Number),
        fp_laps: expect.any(Number),
        fp_position: expect.any(Number),
        team_id: expect.any(Number),
        team_name: expect.any(String),
      }),
    );
  });

  it('/free-practice/circuit/:id (GET) NOT FOUND', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/free-practice/circuit/999')
      .set('api-key', apiKey);

    expect(response.status).toEqual(404);
    expect(response.body.error).toEqual('Not Found');
  });

  it('/free-practice/team/:id (GET) OK', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/free-practice/team/2')
      .set('api-key', apiKey);

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        circuit_circuit_name: expect.any(String),
        circuit_id: expect.any(Number),
        driver_id: expect.any(Number),
        driver_name: expect.any(String),
        fp_average_speed: expect.any(Number),
        fp_fast_lap: expect.any(Number),
        fp_fp_number: expect.any(Number),
        fp_grand_prix: expect.any(Number),
        fp_laps: expect.any(Number),
        fp_position: expect.any(Number),
        team_id: expect.any(Number),
        team_name: expect.any(String),
      }),
    );
  });

  it('/free-practice/team/:id (GET) NOT FOUND', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/free-practice/team/999')
      .set('api-key', apiKey);

    expect(response.status).toEqual(404);
    expect(response.body.error).toEqual('Not Found');
  });

  it('free-practice/avg-speed/driver/:id (GET) OK', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/free-practice/avg-speed/driver/12')
      .set('api-key', apiKey);

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        circuit_circuit_name: expect.any(String),
        fp_average_speed: expect.any(Number),
        fp_fp_number: expect.any(Number),
      }),
    );
  });

  it('/free-practice/avg-speed/driver/:id (GET) NOT FOUND', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/free-practice/avg-speed/driver/999')
      .set('api-key', apiKey);

    expect(response.status).toEqual(404);
    expect(response.body.error).toEqual('Not Found');
  });

  it('/free-practice/laps-time/driver/:id (GET) OK', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/free-practice/laps-time/driver/12')
      .set('api-key', apiKey);

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        circuit_circuit_name: expect.any(String),
        fp_fast_lap: expect.any(Number),
        fp_fp_number: expect.any(Number),
      }),
    );
  });

  it('/free-practice/laps-time/driver/:id (GET) NOT FOUND', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/free-practice/laps-time/driver/999')
      .set('api-key', apiKey);

    expect(response.status).toEqual(404);
    expect(response.body.error).toEqual('Not Found');
  });

  it('/free-practice/positions/driver/:id (GET) OK', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/free-practice/positions/driver/12')
      .set('api-key', apiKey);

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        circuit_circuit_name: expect.any(String),
        fp_position: expect.any(Number),
        fp_fp_number: expect.any(Number),
      }),
    );
  });

  it('/free-practice/positions/driver/:id (GET) NOT FOUND', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/free-practice/positions/driver/999')
      .set('api-key', apiKey);

    expect(response.status).toEqual(404);
    expect(response.body.error).toEqual('Not Found');
  });

  afterEach(async () => {
    await app.close();
  });
});
