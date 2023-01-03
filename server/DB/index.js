const mysql = require('mysql');
const dotenv = require('dotenv');
const config = require('../config/config.js');
dotenv.config();

const con = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: process.env.DATABASE_PASSWORD,
    database: 'project2'
  }
);

con.connect((err) => {
  if (err) throw err;
});

module.exports = con;
