const mongoose = require("mongoose");

const CertificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    date: { type: String },
    url: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Certification", CertificationSchema);