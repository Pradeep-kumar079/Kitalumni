const mongoose = require("mongoose");

const suggestionSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "postmodel", required: true },
    text: { type: String, required: true },  
    createdAt: { type: Date, default: Date.now },
});

Suggestion = mongoose.model("Suggestion", suggestionSchema);
module.exports = Suggestion;
