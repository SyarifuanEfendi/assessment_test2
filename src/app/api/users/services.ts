import { pool } from "@/lib/dbconn";
import { PoolClient, QueryResult } from "pg";
import bcrypt, { compare } from "bcrypt";

export const getData = async (p?: { id: string }, client?: PoolClient) => {
  let sql = "";
  client = await pool.connect();
  sql = `select * from users`;
  const cek = await client.query(sql);
  if (p) {
    sql = `select * from users where id = $1`;
    const cek = await client.query(sql, [p]);
    return cek.rows;
  }
  return cek.rows;
};

export const createData = async (data: any, client?: PoolClient) => {
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
    return {
      status: false,
      status_code: 400,
      message: "something went wrong, try again in a moment",
    };
  }
};

export const updateData = async (
  id: string,
  data: any,
  client?: PoolClient
) => {
  let sql = "";
  let sqlResult: QueryResult | null = null;
  try {
    if (!client) {
      client = await pool.connect();
    }
    const cek = await client.query(`select * from users where id = $1`, [id]);

    if (cek.rows.length < 0) {
      return {
        status: false,
        status_code: 400,
        message: "User not found",
      };
    }
    await client.query("BEGIN");
    sql = `update users set firstname = $1, lastname = $2 where id = $3`;

    sqlResult = await client.query(sql, [data.firstname, data.lastname, id]);
    await client.query("COMMIT");
    return { status: true, status_code: 200, message: "Success" };
  } catch (error) {
    if (client) {
      await client.query("ROLLBACK");
    }
    return {
      status: false,
      status_code: 400,
      message: "something went wrong, try again in a moment",
    };
  }
};

export const updatePassword = async (
  id: string,
  data: any,
  client?: PoolClient
) => {
  let sql = "";
  let sqlResult: QueryResult | null = null;
  try {
    if (!client) {
      client = await pool.connect();
    }
    const cek = await client.query(`select * from users where id = $1`, [id]);

    if (cek.rows.length < 0) {
      return {
        status: false,
        status_code: 400,
        message: "User not found",
      };
    }

    const cekPass = await compare(data.passwordlama, cek.rows[0].password);
    if (cekPass) {
      await client.query("BEGIN");
      let pass = await bcrypt.hash(data.password, 10);
      sql = `update users set password = $1 where id = $2`;

      sqlResult = await client.query(sql, [pass, id]);
      await client.query("COMMIT");
      return { status: true, status_code: 200, message: "Success" };
    } else {
      return {
        status: false,
        status_code: 300,
        message: "Password is incorrect",
      };
    }
  } catch (error) {
    if (client) {
      await client.query("ROLLBACK");
    }
    return { status: false, status_code: 400, message: error };
  }
};

export const deleteData = async (id: string, client?: PoolClient) => {
  let sql = "";
  let sqlResult: QueryResult | null = null;
  try {
    if (!client) {
      client = await pool.connect();
    }
    const cek = await client.query(`select * from users where id = $1`, [id]);

    if (cek.rows.length < 0) {
      return {
        status: false,
        status_code: 400,
        message: "User not found",
      };
    }
    await client.query("BEGIN");
    sql = `delete from users where id = $1`;

    sqlResult = await client.query(sql, [id]);
    await client.query("COMMIT");
    return { status: true, status_code: 200, message: "Success" };
  } catch (error) {
    if (client) {
      await client.query("ROLLBACK");
    }
    return {
      status: false,
      status_code: 400,
      message: "something went wrong, try again in a moment",
    };
  }
};
