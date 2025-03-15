const mongoose = require('mongoose');


const responseSchema = new mongoose.Schema({
    prompt: { type: String, required: true },
    textResponse: { type: String, required: true },
    audioBase64: { type: String },
  });


  const User = mongoose.model('response', responseSchema);
module.exports = User;