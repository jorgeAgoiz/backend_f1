import { Module } from '@nestjs/common';
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
        environment: environmentTypes.development,
        release: null,
        logLevels: [logLevels.debug],
      }),
      inject: [ConfigService],
    }),
    DriversModule,
    CircuitsModule,
    TeamsModule,
    GrandPrixModule,
    FreePracticeModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useValue: new SentryInterceptor(),
    },
  ],
})
export class AppModule {}
