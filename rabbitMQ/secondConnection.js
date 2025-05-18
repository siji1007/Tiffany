const mysql = require('mysql2');

const consumerDb = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'olsmg_db'
});

consumerDb.connect((err) => {
  if (err) {
    console.error('❌ Second DB connection failed:', err);
  } else {
    console.log('✅ Connected to second database');
  }
});

module.exports = consumerDb;
