import mysql from 'mysql2/promise'

export async function createConnection({query, values = []}) {
    const dbconnection = await mysql.createConnection({
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    });

    try {
        const [results] = await dbconnection.execute(query, values);
        dbconnection.end();
        return results;
    } catch (error) {
        console.log(error);
        throw Error(error.message)
    }
}