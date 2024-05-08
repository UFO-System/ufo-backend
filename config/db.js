const mysql = require('mysql');
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "OrderSystem",
  database: "OrderSystem",
  password: "OrderSystem",
  port: 3306,
  timezone: "Asia/Seoul",
  dateStrings: true
});

pool.on('connection', () => console.log('DB Connection established'));

module.exports = pool;