import pg from "pg";
import { dbConfig } from './dbConfig.js';

export async function dbSetup() {
    let pgPool = new pg.Pool(dbConfig);
    console.log(`DB setup`);
    const dbClient = await pgPool.connect();
    return { dbClient };
}