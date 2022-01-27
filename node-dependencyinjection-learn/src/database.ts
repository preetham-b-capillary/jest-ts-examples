import mysql from 'mysql2';

const connection: any = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  database: 'testdb',
  password: 'mypassword'
});


export async function getUser(userName: string) {
  try {
    const [rows]: any = await connection.promise().query(
      `SELECT *
      FROM users
      WHERE username = ?`,
      [userName]
    );
    return rows[0];
  } catch (error) {
    console.log(error);
    return;
  }

};


export async function createUser(username:string, password: string) {
  try {
    const {insertId}: any = await connection.promise().query(
      `INSERT INTO users (username, password)
       VALUES (?, ?)`,
       [username, password]
    );

    return insertId;
  } catch (error) {
    console.log(error);
    return;
  }
}