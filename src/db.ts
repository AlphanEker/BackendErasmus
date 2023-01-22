import pg from "pg";
import express from "express";

var client: pg.Client;
var connected: boolean = false;

export function isConnected() {
  return connected;
}

export async function connect() {
  client = new pg.Client({
    user: "db",
    database: "db",
    password: "123",
    host: "host",
    port: "2345",
    connectionTimeoutMillis: 2000,
  });

  client.connect((err) => {
    if (!err) {
      connected = true;
      client.on("error", (err) => {
        connected = false;
        client.end();
        setTimeout(() => {
          connect();
        }, 5000);
      });
    }

    if (err) {
      connected = false;
      client.end();
      setTimeout(() => {
        connect();
      }, 5000);
    }
  });
}

export type QueryArgs = {
  text: string;
  singleRow?: boolean;
  values?: any[];
};

export async function query(args: QueryArgs) {
  try {
    const r = await client.query(args);
    if (args["singleRow"] && r.rows.length == 1) {
      return r.rows[0];
    } else {
      return r.rows;
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function stdQuery(
  args: QueryArgs,
  res: express.Response,
  keep_on: boolean = false
) {
  try {
    let r = await query(args);
    if (!keep_on) {
      res.json(r);
    }
  } catch (e) {
    return res.sendStatus(500);
  }
}

export function collectSqlParametersForInsert(
  obj: any,
  tableName: string,
  exclude: string[]
) {
  let parameterIdx = 1;
  let parameterIndices: string[] = [];
  let parameterNames: string[] = [];
  let parameters: any[] = [];

  Object.entries(obj).forEach((entry) => {
    const [key, value] = entry;
    if (
      !exclude.includes(key) &&
      typeof value !== "undefined" &&
      value !== null
    ) {
      parameterIndices.push(`$${parameterIdx++}`);
      parameterNames.push(key);
      parameters.push(value);
    }
  });
  return {
    indices: `${parameterIndices.join(",")}`,
    names: `${parameterNames.map((e) => tableName + '"' + e + '"').join(",")}`,
    objects: parameters,
  };
}
