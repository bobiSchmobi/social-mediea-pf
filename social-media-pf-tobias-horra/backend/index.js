const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const disk = require("fs");
const cors = require('cors')

const path = require("path");

const database = path.resolve(__dirname, "./students.json");

app.use(express.json());
app.use(cors())

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.get("/students", function (req, res) {
  const data = disk.readFileSync(database, "utf-8");
  const students = JSON.parse(data);
  res.json(students);
});

app.post("/students", function (req, res) {
  const data = disk.readFileSync(database, "utf-8");
  const students = JSON.parse(data);

  // request body containing the new student data
  const newStudent = req.body;

  //add new student
  students.push(newStudent);

  disk.writeFileSync(database, JSON.stringify(students, null, 2));
  res.json(students);
});

app.delete("/students/:id", function (req, res) {
  const data = disk.readFileSync(database, "utf-8");
  const students = JSON.parse(data);

  for (let i = 0; i < students.length; i++) {
    if (students[i].id == req.params.id) {
      students.splice(i, 1);
      break;
    }
  }

  disk.writeFileSync(database, JSON.stringify(students, null, 2));
  res.json(students);
});

app.put("/students/:id", function (req, res) {
  const data = disk.readFileSync(database, "utf-8");
  var students = JSON.parse(data);

  // request body containing the new student data
  const updatedStudent = req.body;

  for (let i = 0; i < students.length; i++) {
    if (students[i].id == req.params.id) {
      students[i] = updatedStudent;
      break;
    }
  }

  disk.writeFileSync(database, JSON.stringify(students, null, 2));
  res.json(students);
});

app.get("/students/under-30", function (req, res) {
  const data = disk.readFileSync(database, "utf-8");
  const students = JSON.parse(data);
  const under30Students = [];

  for (let i = 0; i < students.length; i++) {
    if (students[i].age < 30) {
      under30Students.push(students[i]);
    }
  }

  res.json(under30Students);
});

app.listen(3000, function () {
  console.log(`Example app listening on port 3000`);
});
