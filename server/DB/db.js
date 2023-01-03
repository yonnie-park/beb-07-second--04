const mysql = require('mysql');

const con = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: process.env.DATABASE_PASSWORD,
    database: 'project2'

  }
);

con.connect(() => {
  console.log("db init success");
})


module.exports = con;
