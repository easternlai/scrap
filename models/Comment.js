var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NoteSchema = new Schema({
    name: String,
    subject: String,
    body: String
});

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;