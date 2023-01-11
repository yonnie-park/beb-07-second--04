const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

const con = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: process.env.DATABASE_PASSWORD,
    database: 'project2',
    port: '3306'
  }
);

con.connect((err) => {
<<<<<<< HEAD
  // if(err) throw err;
=======
  //if(err) throw err;
>>>>>>> c293c7fb51d35802ddab7914c2280b3f321fca5a
  console.log("db init success");
  
})


module.exports = con;
