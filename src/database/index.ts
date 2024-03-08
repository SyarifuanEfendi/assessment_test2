import { Sequelize } from "sequelize";
import config from "./config/config.js";
const env = process.env.NODE_ENV || "development";

export interface GConfigInf {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  logging: boolean;
  dialect:
    | "mysql"
    | "postgres"
    | "mariadb"
    | "mssql"
    | "db2"
    | "snowflake"
    | "oracle";
}

export interface SConfigInf {
  dialect: "sqlite";
  storage: string;
}

let connection;
let opt: {
  pool: {
    max: number;
    min: number;
    acquire: number;
    idle: number;
  };
} = { pool: { max: 5, min: 0, acquire: 30000, idle: 10000 } };
var cfg: GConfigInf | SConfigInf = (
  ["development", "staging", "production"].indexOf(env) > -1
    ? config[env]
    : config.development
) as GConfigInf | SConfigInf;

if (env !== "test") {
  let { database, username, password, host, port, logging, dialect } =
    cfg as GConfigInf;
  connection = `${dialect}://${username}:${password}@${host}:${port}/${database}`;
} else {
  let { storage, dialect } = cfg as SConfigInf;
  connection = `${dialect}:${storage}`;
}

opt.pool = {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000,
};

let { database, username, password, host, port, logging, dialect } =
  cfg as GConfigInf;
const sequelize = new Sequelize({
  dialectModule: require("pg"),
  dialect: "postgres",
  host,
  username,
  database,
  password,
  port: 5432,
  pool: opt.pool,
});

export default sequelize;
