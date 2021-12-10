import { TypeOrmModuleOptions } from '@nestjs/typeorm';
console.log(__dirname);

export default () =>
  ({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_NAME,
    entities: ['../../dist/**.entity{.ts,.js}'],
    cli: {
      migrationsDir: './',
    },
  } as TypeOrmModuleOptions);
