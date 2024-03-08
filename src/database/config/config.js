require("dotenv").config({ path: ".env" });
module.exports = {
  development: {
    username: process.env.DATABASE_USER || "user",
    password: process.env.DATABASE_PASS || "pass",
    database: process.env.DATABASE_DB || "assessment_2",
    host: process.env.DATABASE_HOST || "127.0.0.1",
    port: parseInt(process.env.DATABASE_PORT || "") || 5432,
    logging: true,
    dialect: "postgres",
  },
  test: {
    storage: ":memory",
    dialect: "sqlite",
  },
  production: {
    username: process.env.DATABASE_USER || "postgres",
    password: process.env.DATABASE_PASS || "postgres",
    database: process.env.DATABASE_DB || "postgres",
    host: process.env.DATABASE_HOST || "localhost",
    port: parseInt(process.env.DATABASE_PORT || "") || 5432,
    logging: false,
    dialect: "postgres",
  },
};
