import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriversModule } from './drivers/drivers.module';
import { CircuitsModule } from './circuits/circuits.module';
import { TeamsModule } from './teams/teams.module';
import { Circuits } from './circuits/circuits.entity';
import { Drivers } from './drivers/drivers.entity';
import { Teams } from './teams/teams.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'formula_one',
      entities: [Circuits, Drivers, Teams],
      synchronize: false,
    }),
    DriversModule,
    CircuitsModule,
    TeamsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
