import { dbSetup } from "../dbConnection/dbSetup.js";

export async function addRow() {
    const connection = await dbSetup();
    const insert = `Insert into shwifttable(name) values ('Shivang')`;
    const dbResult = await connection.dbClient.query(insert);
    console.log(dbResult);
    connection.dbClient.release();
}

addRow();