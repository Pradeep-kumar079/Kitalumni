const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

const Tokenmodel = mongoose.model("Tokenmodel", TokenSchema);
module.exports  = Tokenmodel;
