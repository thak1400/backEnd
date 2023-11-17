import pg from "pg";
import { dbConfig } from './dbConfig.js';

export async function dbSetup() {
    let pgPool = new pg.Pool(dbConfig);
    const dbClient = await pgPool.connect();
    return {dbClient};
}