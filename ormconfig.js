module.exports = {
    name: 'umojalandsmarketplacedb',
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: ['src/**/*entity.ts'],
    migrations: ['src/migrations/**/*.ts'],
    logging: false,
    cli: {
      entitiesDir: 'src',
      migrationsDir: 'src/migrations',
    },
    options: { trustServerCertificate: true },
  };