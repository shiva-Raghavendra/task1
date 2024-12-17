const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Mysql1234', 
  database: 'task1',
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL connected...");
});

db.query(
  (err) => {
    if (err) throw err;
    console.log("Table created!");
  }
);

app.post('/add-employee', (req, res) => {
  const { name, employeeId, email, phoneNumber, dateOfJoining, role } = req.body;
  const sql = "INSERT INTO employees (name, employeeId, email, phoneNumber, dateOfJoining, role) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(sql, [name, employeeId, email, phoneNumber, dateOfJoining, role], (err) => {
    if (err) throw err;
    res.send({ message: "Employee added successfully!" });
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
