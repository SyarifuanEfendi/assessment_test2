import { Pool } from "pg";

const credentials = {
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT as string),
  database: process.env.DATABASE_DB,
  password: process.env.DATABASE_PASS,
};

export const pool = new Pool(credentials);