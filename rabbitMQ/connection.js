const mysql = require("mysql2");

// Create a connection to your MySQL database (XAMPP)
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",        // default user for XAMPP
  password: "",        // default password for XAMPP is empty
  database: "bombase", // replace with your DB name (e.g., "pos_system")
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: ", err);
    return;
  }
  console.log("✅ Connected to MySQL Database!");
});

module.exports = connection;
