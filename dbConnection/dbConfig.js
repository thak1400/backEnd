export const dbConfig = {
    database: 'shwift_db',
    host: 'shwift-db.cdygvvviudvj.us-east-2.rds.amazonaws.com',
    port: 5432,
    user: 'shwiftAdmin',
    password: 'Shwift69',
    ssl: {
        rejectUnauthorized: false
    }
};


    // paswdSsmParamKey: `/config/resimplified/rds/rdsmasterpassword/dev`,
    // ssl: {
    //     rejectUnauthorized: false,
    //     ca: fs.readFileSync("./cert/rds-ca-2019-root.pem").toString()
    // },
    // connectionTimeoutMillis: 5000,
    // pool: {
    //     max: 5,
    //     idleTimeoutMillis: 0
    // }