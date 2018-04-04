var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
  author_id: Number,
  name: { type: String, required: true, max: 100 },
  profile_url: String,
  repos: [{ type: Schema.Types.ObjectId, ref: "Repo" }]
});

//Export model
module.exports = mongoose.model("Author", AuthorSchema);
