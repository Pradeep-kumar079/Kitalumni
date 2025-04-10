const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  postimg:{
    type : String,
    required:false,
  },
  videopost:{
    type:String,
    required:false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usermodel",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usermodel"
  }],
  suggestion: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "suggestmodel",
    },
  ],
  category:{
    type:String,
    required:false,
  },
  reports: [
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "Usermodel" }, // Who reported
        reason: String,
        reportedAt: { type: Date, default: Date.now }
    }
],
hashtags:[],
  
  createdAt: { type: Date, default: Date.now }
});


const postmodel = mongoose.model("postmodel" , postSchema);
module.exports = postmodel;
