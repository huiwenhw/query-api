// BASE SETUP
// =============================================================================

// call the packages we need
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Set up mongoose connection
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/project");
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// set our port
const port = process.env.PORT || 8080;

// Require models
const User = require("./app/models/user");
const Repo = require("./app/models/repo");
const Author = require("./app/models/author");

// ROUTES FOR OUR API
// =============================================================================
const router = express.Router(); // get an instance of the express Router

// test route (accessed at GET http://localhost:8080/api)
router.get("/", function(req, res) {
  res.json({ message: "Hello! Welcome to the mini Github Repositories api!" });
});

router.route("/users").get(function(req, res) {
  User.find({}, { _id: 0, __v: 0 }, function(err, users) {
    if (err) res.send(err);
    res.json(users);
  });
});

router.route("/repos").get(function(req, res) {
  let data = [];

  if (req.query.sort) {
    let field = req.query.sort.split("-")[0];
    let way = req.query.sort.split("-")[1];

    let q = {};
    q[field] = way;

    Repo.find({}, { _id: 0, __v: 0 })
      .sort(q)
      .exec(function(err, data) {
        if (err) res.send(err);
        res.json(data);
      });
  } else {
    Repo.find({}, { _id: 0, __v: 0 }, function(err, data) {
      if (err) res.send(err);

      let newData;
      for (let key in req.query) {
        console.log(key, req.query[key]);
        let value = req.query[key].toLowerCase();

        newData = data.filter(obj => {
          let currKey = obj[key] + "" || "";
          return currKey.toLowerCase() === value;
        });
        data = newData;
      }
      res.json(data);
    });
  }
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use("/api", router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log("Magic happens on port " + port);
