const mysql = require('mysql2/promise');
require('dotenv').config();

async function check() {
  const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

  const [orders] = await pool.query('SELECT id FROM orders');
  console.log('Available Order IDs:', orders.map(o => o.id));
  
  const [users] = await pool.query('SELECT email, role FROM users');
  console.log('User Roles:', users);

  process.exit();
}

check();
