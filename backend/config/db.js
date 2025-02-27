const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'exam_system',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise();

pool.getConnection()
  .then(connection => {
    console.log('Đã kết nối thành công tới cơ sở dữ liệu');
    connection.release();
  })
  .catch(err => {
    console.error('Lỗi kết nối cơ sở dữ liệu:', err);
  });

module.exports = pool;

