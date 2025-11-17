const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["full-time", "internship"], 
      required: true
    },
    company: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    startDate: {
      type: String,
      required: true
    },
    endDate: {
      type: String
    },
    description: {
      type: String
    },
    link: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Experience", ExperienceSchema);