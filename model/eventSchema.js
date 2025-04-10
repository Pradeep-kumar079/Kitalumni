const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: "admin",
   
  },
  title: {
    type: String,
    required: true
  },
  postimg: {
    type: String // Store filename or URL of uploaded image
  },
  videopost: {
    type: String // Store filename or URL of uploaded video
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  location: {
    type: String,
    default: null,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  eventDate: {
    type: Date,
    default:Date.now()
  },
  eventTime: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Event', eventSchema);
