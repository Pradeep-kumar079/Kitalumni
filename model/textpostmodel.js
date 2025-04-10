const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'usermodel' }, 
  date: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Number,
    default: 0
  },
  suggestions: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: "suggestmodel"
  }]
});

const textpostmodel = mongoose.model("textpostmodel", postSchema);

module.exports = textpostmodel;
