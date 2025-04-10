const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
    graduate: String,
    branches: [String], // Example: ["CSE", "Mechanical", "Civil"]
    alumini :{
       type: mongoose.Schema.Types.ObjectId,
          ref: "Usermodel",
    }
});

const BatchModel = mongoose.model("Batch", batchSchema);

module.exports = BatchModel;
