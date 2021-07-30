require('dotenv').config();
const mysql = require('mysql2');

const SQLpassword = process.env.DB_PASSWORD;

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: SQLpassword,
      database: 'employees_db'
    },
    console.log(`Connected to employees_db.`)
  );

module.exports = db;