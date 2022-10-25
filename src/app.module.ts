import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriversModule } from './drivers/drivers.module';
import { CircuitsModule } from './circuits/circuits.module';
import { TeamsModule } from './teams/teams.module';
import { DatabaseConfiguration } from './config/database-config';
import { ConfigModule } from '@nestjs/config';
import { SentryInterceptor, SentryModule } from '@ntegral/nestjs-sentry';
import { ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

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
        environment: 'development',
        release: null,
        logLevels: ['debug'],
      }),
      inject: [ConfigService],
    }),
    DriversModule,
    CircuitsModule,
    TeamsModule,
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
