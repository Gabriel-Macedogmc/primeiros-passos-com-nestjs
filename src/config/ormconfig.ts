import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';
export default {
  name: 'default',
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_NAME,
  entities: [__dirname + '/../**/*{.ts,.js}'],
  migrations: [__dirname + '/../shared/infra/typeorm/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/shared/infra/typeorm/migrations',
  },
} as TypeOrmModuleOptions;
