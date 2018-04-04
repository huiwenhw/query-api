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
  res.json({ message: "Hello! welcome to the mini Github Repositories api!" });
});

router.route("/users").get(function(req, res) {
  User.find({}, { _id: 0, __v: 0 }, function(err, users) {
    if (err) res.send(err);
    res.json(users);
  });
});

router.route("/users/:user/repos").get(function(req, res) {
  let userq = req.params.user;
  Repo.find({ user: userq }, { _id: 0, __v: 0 }, function(err, user) {
    if (err) res.send(err);
    res.json(user);
  });
});

router.route("/users/:user/repos/:reponame").get(function(req, res) {
  let userq = req.params.user;
  let repoq = req.params.reponame;
  Repo.findOne({ user: userq, name: repoq }, { _id: 0, __v: 0 }, function(
    err,
    repo
  ) {
    if (err) res.send(err);
    res.json(repo);
  });
});

// If there is > 1 value for a field query e.g. ?user=facebook&user=airbnb, only the first one will be taken into account
router.route("/repos").get(function(req, res) {
  let data = [];

  let q = {};
  if (req.query.sort) {
    let value = req.query.sort;
    if (Array.isArray(value)) {
      for (let i in value) {
        let field = value[i].split("-")[0];
        let way = value[i].split("-")[1];
        q[field] = way;
      }
    } else {
      let field = value.split("-")[0];
      let way = value.split("-")[1];
      q[field] = way;
    }
  }

  let fullq = {};
  for (let key in req.query) {
    if (key === "sort") continue;
    let value = req.query[key];
    if (Array.isArray(req.query[key])) {
      value = req.query[key][0];
    }
    fullq[key] = value.toLowerCase();
  }
  console.log(fullq, q);

  Repo.find(fullq)
    .sort(q)
    .exec(function(err, data) {
      if (err) res.send(err);
      res.json(data);
    });
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use("/api", router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log("Magic happens on port " + port);
