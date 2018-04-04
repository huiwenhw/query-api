var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var RepoSchema = new Schema({
  created_at: Date,
  description: String,
  forks_count: Number,
  full_name: { type: String, required: true, max: 100, unique: true },
  has_downloads: Boolean,
  has_issues: Boolean,
  language: String,
  name: { type: String, required: true, max: 100 },
  private: Boolean,
  size: Number,
  stargazers_count: Number,
  url: { type: String, required: true, max: 100 },
  user: { type: String, required: true, max: 100 },
  watchers_count: Number
});

//Export model
module.exports = mongoose.model("Repo", RepoSchema);
