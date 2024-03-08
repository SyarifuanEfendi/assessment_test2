import { pool } from "@/lib/dbconn";
import { PoolClient, QueryResult } from "pg";
import bcrypt from "bcrypt";

export const UserCreateService = async (data: any, client?: PoolClient) => {
  let sql = "";
  let sqlResult: QueryResult | null = null;

  try {
    if (!client) {
      client = await pool.connect();
    }
    const cek = await client.query(`select * from users where email = $1`, [
      data.email,
    ]);

    if (cek.rows.length > 0) {
      return {
        status: false,
        status_code: 300,
        message: "User already exists",
      };
    }
    await client.query("BEGIN");
    let pass = await bcrypt.hash(data.password, 10);
    sql = `INSERT INTO users (firstname, lastName, email, password) values ($1, $2, $3, $4)`;

    sqlResult = await client.query(sql, [
      data.firstname,
      data.lastname,
      data.email,
      pass,
    ]);
    await client.query("COMMIT");
    return { status: true, status_code: 200, message: "Success" };
  } catch (error) {
    if (client) {
      await client.query("ROLLBACK");
    }
    return { status: false, status_code: 400, message: error };
  }
};
