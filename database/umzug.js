import { Umzug, SequelizeStorage } from "umzug";
import { Sequelize } from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";

import { fileURLToPath } from "url";
import path from "path";
import config from "./config.js";
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const env = process.env.NODE_ENV || "development";
const currentConfig = config[env];

const sequelize = new Sequelize({
  ...currentConfig,
  dialect: PostgresDialect
});

export const migrator = new Umzug({
  migrations: {
    glob: ["migrations/*.js", { cwd: __dirname }]
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
    modelName: "migration_meta"
  }),
  logger: console
});


export const seeder = new Umzug({
  migrations: {
    glob: ["seeders/*.js", { cwd: __dirname }]
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
    modelName: "seeder_meta"
  }),
  logger: console
});

