import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriversModule } from './models/drivers/drivers.module';
import { CircuitsModule } from './models/circuits/circuits.module';
import { TeamsModule } from './models/teams/teams.module';
import { DatabaseConfiguration } from './config/database-config';
import { ConfigModule } from '@nestjs/config';
import { SentryInterceptor, SentryModule } from '@ntegral/nestjs-sentry';
import { ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GrandPrixModule } from './models/grand-prix/grand-prix.module';
import { FreePracticeModule } from './models/free-practice/free-practice.module';
import { environmentTypes, logLevels } from './common/constants/sentry-config';
import { QualifyingModule } from './models/qualifying/qualifying.module';
import { GridModule } from './models/grid/grid.module';
import { SprintModule } from './models/sprint/sprint.module';
import { RaceModule } from './models/race/race.module';
import { FastLapModule } from './models/fast-lap/fast-lap.module';
import { LoggerModule } from 'nestjs-pino';
import { CorrelationIdMiddleware } from './common/middlewares/correlation-id.middleware';
import { Request } from 'express';
import { CORRELATION_ID } from './common/constants/logger';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfiguration,
    }),
    SentryModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (cfg: ConfigService) => ({
        dsn: process.env.DSN_SENTRY,
        debug: true,
        environment: process.env.SENTRY_ENV,
        release: null,
        logLevels: [logLevels.debug],
      }),
      inject: [ConfigService],
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            messageKey: 'message',
          },
        },
        messageKey: 'message',
        customProps: (req: Request) => {
          return {
            correlationId: req[CORRELATION_ID],
          };
        },
      },
    }),
    DriversModule,
    CircuitsModule,
    TeamsModule,
    GrandPrixModule,
    FreePracticeModule,
    QualifyingModule,
    GridModule,
    SprintModule,
    RaceModule,
    FastLapModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useValue: new SentryInterceptor(),
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}
