import dotenv from 'dotenv';
import { PostgresDialect } from '@sequelize/postgres';

dotenv.config();

const config = {
  development: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ? process.env.DB_PORT : '5432'),
    dialect: PostgresDialect
  },
  production: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ? process.env.DB_PORT : '5432'),
    dialect: PostgresDialect,
    logging: false
  }
};

export default config;
