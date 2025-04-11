const mongoose = require("mongoose");
const defaultImg = "upload/defaultimg.png";
const bcrypt = require('bcryptjs');
 // Default image path

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 4,
  },

  bio: {
    type: String,
    default: "No bio provided", 
    maxlength: 300,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 6,  
  },

  profileimg: {
    type: String,
    default: defaultImg,  
    required: false ,
  },

  DOB: {
    type: Date,
    required: false,
  },

  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "postmodel",
  }],

  branch: {
    type: String,
    required: true,
  },

  usn: {
    type: String,
    unique: true,
    required: true,
  },

  graduate: {
    type: Number,
    required: true,
    min: 1900,  
    max: 2100,
  },
  role: { type: String, enum: ["student", "alumni", "admin"], required: true },
  mobileno:{
    type:Number,
    required:true
  },
  sessionid: {
    type: String,   
    required: false  // Change from "true" to "false"
},
  resetToken: { type: String },
  resetTokenExpiry: { type: Date },
  lastActive: {
    type: Date,
    default: Date.now
  },
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  placements: [{ type: mongoose.Schema.Types.ObjectId, ref: "Placement" }],
  internships: [{ type: mongoose.Schema.Types.ObjectId, ref: "Internship" }],
  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Usermodel" }],  
  pendingRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Usermodel" }] ,
  connectionCount: { type: Number, default: 0 }, // New field
}, { timestamps: true });




// await Usermodel.findByIdAndUpdate(senderId, { 
//   $addToSet: { connections: receiverId }, 
//   $inc: { connectionCount: 1 }  // Increment count
// });
// await Usermodel.findByIdAndUpdate(receiverId, { 
//   $addToSet: { connections: senderId }, 
//   $inc: { connectionCount: 1 } 
// });

const Usermodel = mongoose.model("Usermodel", userSchema);

module.exports = Usermodel;
