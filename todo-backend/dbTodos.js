const mongoose = require('mongoose');

const todoSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true } // Corrected option here
);

module.exports = mongoose.model("todos", todoSchema);
