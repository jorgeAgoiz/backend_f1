import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { GrandPrix } from 'src/grand-prix/grand-prix.entity';
import { Circuit } from '../circuits/circuit.entity';
import { Driver } from '../drivers/driver.entity';
import { Team } from '../teams/team.entity';

export class DatabaseConfiguration implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,

      entities: [Circuit, Driver, Team, GrandPrix],
      synchronize: false,
    };
  }
}
