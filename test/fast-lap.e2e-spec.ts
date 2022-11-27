import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Fast Laps (e2e)', (): void => {
  let app: INestApplication;
  const apiKey: string = process.env.API_KEY;

  beforeEach(async (): Promise<void> => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/fast-lap (GET) OK', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/fast-lap')
      .set('api-key', apiKey);

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        grand_prix: expect.any(Number),
        fl_session: expect.any(String),
        time: expect.any(Number),
        lap: expect.any(Number),
      }),
    );
  });

  it('/fast-lap/driver/:id (GET) OK', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/fast-lap/driver/12')
      .set('api-key', apiKey);

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        fl_grand_prix: expect.any(Number),
        fl_fl_session: expect.any(String),
        fl_time: expect.any(Number),
        fl_lap: expect.any(Number),
        driver_id: expect.any(Number),
        driver_name: expect.any(String),
        circuit_id: expect.any(Number),
        circuit_circuit_name: expect.any(String),
        team_name: expect.any(String),
        team_id: expect.any(Number),
      }),
    );
  });

  it('/fast-lap/driver/:id (GET) OK', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/fast-lap/driver/999')
      .set('api-key', apiKey);

    expect(response.status).toEqual(404);
    expect(response.body.error).toEqual('Not Found');
  });

  it('/fast-lap/circuit/:id (GET) OK', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/fast-lap/circuit/16')
      .set('api-key', apiKey);

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        fl_grand_prix: expect.any(Number),
        fl_fl_session: expect.any(String),
        fl_time: expect.any(Number),
        fl_lap: expect.any(Number),
        driver_id: expect.any(Number),
        driver_name: expect.any(String),
        circuit_id: expect.any(Number),
        circuit_circuit_name: expect.any(String),
        team_name: expect.any(String),
        team_id: expect.any(Number),
      }),
    );
  });

  it('/fast-lap/circuit/:id (GET) OK', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/fast-lap/circuit/999')
      .set('api-key', apiKey);

    expect(response.status).toEqual(404);
    expect(response.body.error).toEqual('Not Found');
  });

  it('/fast-lap/team/7d (GET) OK', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/fast-lap/team/7')
      .set('api-key', apiKey);

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        fl_grand_prix: expect.any(Number),
        fl_fl_session: expect.any(String),
        fl_time: expect.any(Number),
        fl_lap: expect.any(Number),
        driver_id: expect.any(Number),
        driver_name: expect.any(String),
        circuit_id: expect.any(Number),
        circuit_circuit_name: expect.any(String),
        team_name: expect.any(String),
        team_id: expect.any(Number),
      }),
    );
  });

  it('/fast-lap/team/:id (GET) OK', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/fast-lap/team/999')
      .set('api-key', apiKey);

    expect(response.status).toEqual(404);
    expect(response.body.error).toEqual('Not Found');
  });

  afterEach(async () => {
    await app.close();
  });
});
