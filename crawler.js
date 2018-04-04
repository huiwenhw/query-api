const axios = require("axios");

//Set up mongoose connection
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/project");
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

const User = require("./app/models/user");
const Repo = require("./app/models/repo");
const Author = require("./app/models/author");

// pre-defined github users account to scrape
let users = ["airbnb", "facebook", "stripe"];

async function getData() {
  for (let i = 0; i < users.length; i++) {
    let url = `https://api.github.com/users/${users[i]}/repos?per_page=100`;
    let res = await axios.get(url);

    let repoData = res.data;
    var allRepos = [];
    for (let k = 0; k < repoData.length; k++) {
      let currData = repoData[k];
      console.log(currData.full_name);

      let language = currData.language;
      if (language) {
        language = currData.language.toLowerCase();
      }
      let currRepo = new Repo({
        created_at: currData.created_at,
        description: currData.description,
        forks_count: currData.forks_count,
        full_name: currData.full_name,
        has_downloads: currData.has_downloads,
        has_issues: currData.has_issues,
        language: language,
        name: currData.name,
        private: currData.private,
        size: currData.size,
        stargazers_count: currData.stargazers_count,
        url: currData.html_url,
        user: users[i],
        watchers_count: currData.watchers_count
      });

      currRepo.save(function(err) {
        if (err) console.log(err);
      });
      allRepos.push(currData.name);
    }

    let currUser = new User({ name: users[i], repos: allRepos });
    currUser.save(function(err) {
      if (err) console.log(err);
    });
  }
  return "done";
}

getData().then(res => {
  process.exit(0);
});
