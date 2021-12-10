
module.exports = {
  type: "postgres",
  host:
    process.env.NODE_ENV === "docker-dev" ? "db" : process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_NAME,
  entities: [`./dist/modules/**/infra/typeorm/models/*{.ts,.js}`],
  cli: {
    migrationsDir: `./src/shared/infra/typeorm/migrations`,
  },
};



