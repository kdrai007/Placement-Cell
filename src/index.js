// Import dependencies
import express from "express";
import { stringify } from "csv-stringify";
import Database from "./database.js";
import Student from "../model/detail.js";
import bodyParser from "body-parser";
import fs from "fs";

// Set port and initialize express app
const port = 3000;
const app = express();

// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Set view engine as EJS
app.set("view engine", "ejs");

// Connect to the database
Database();

// Initialize an array for storing CSV data
let csvData = [];

// Capitalize the first letter of a string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Render the index page with data from the database
app.get("", (req, res) => {
  Student.find({}, (err, data) => {
    if (err) console.log(err);
    else {
      res.render("index", { data: data });
    }
  });
});

// Render the student details page
app.get("/details", (req, res) => {
  res.render("studentDetails");
});

// Add student data to the database and render the profile page
app.post("/profile", (req, res) => {
  // Create a new student object from the request body
  console.log(req.body);
  const data = req.body;
  const student = new Student({
    student: req.body.student,
    college: req.body.college,
    status: req.body.status,
    scores: {
      dsa: req.body.dsa,
      web: req.body.web,
      react: req.body.react,
    },
    interviews: [
      {
        company: req.body.company,
        date: req.body.date,
      },
    ],
    results: [
      {
        company: req.body.company,
        result: req.body.result,
      },
    ],
  });

  // Save the student object to the database
  student.save((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Successfully saved student to the database!");
      res.render("profile2", { data: data });
    }
  });
});

// Render the profile page and add student data to the CSV array
app.get("/profile/:id", (req, res) => {
  Student.find({ _id: req.params.id }, (err, data) => {
    if (err) console.log(err);
    else {
      res.render("profile", { data: data[0] });
      const obj = {
        student: data[0].student,
        college: data[0].college,
        status: data[0].status,
        dsa: data[0].dsa,
        web: data[0].web,
      };
      csvData.push(obj);

      // Write the CSV data to a file
      stringify(
        csvData,
        { delimiter: ";", header: true, quote: '"' },
        function (err, output) {
          fs.writeFile("./public/data.csv", output, (err) => {
            if (err) console.log(err);
          });
        }
      );
    }
  });
  csvData.pop();
});
app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(port, () => console.log("listening on port 3000"));
