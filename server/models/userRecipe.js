const mongoose = require('mongoose');

const { Schema } = mongoose;

const userRecipeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    default: undefined,
    required: true,
  },
  instructions: {
    type: [String],
    default: undefined,
    required: true,
  },
  author: {
    type: [String],
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('recipe', userRecipeSchema);
