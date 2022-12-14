import { Pool } from 'pg';
require('dotenv').config();

if (!process.env.PGPORT || !process.env.PGPASSWORD || !process.env.PGHOST || !process.env.PGPORT || !process.env.PGDATABASE) {
  throw new Error('Postgres configuration contains an undefined value');
}

// process.env imports PGPORT as a string, must convert to a number to please Typescript
const pgPort = parseInt(process.env.PGPORT);

const pgConfig = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: pgPort,
  database: process.env.PGDATABASE,
};

const pool = new Pool(pgConfig);

const usersDB = {
  query: (text: string, params?: any[], callback?: () => void) => {
    if (!callback) return pool.query(text, params);
    if (!params) return pool.query(text);
    return pool.query(text, params, callback);
  },
};

export default usersDB;
