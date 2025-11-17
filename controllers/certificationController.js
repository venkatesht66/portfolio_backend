const Certification = require("../models/Certification");

exports.createCertification = async (req, res) => {
  try {
    const cert = new Certification(req.body);
    await cert.save();
    res.status(201).json(cert);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getCertifications = async (req, res) => {
  const list = await Certification.find().sort({ createdAt: -1 });
  res.json(list);
};

exports.updateCertification = async (req, res) => {
  try {
    const cert = await Certification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(cert);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteCertification = async (req, res) => {
  try {
    await Certification.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};