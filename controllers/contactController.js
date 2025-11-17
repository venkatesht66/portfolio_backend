const Contact = require('../models/Contact');

exports.sendMessage = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!message) return res.status(400).json({ message: "Message is required" });

    const newMsg = new Contact({ name, email, phone, message });
    await newMsg.save();

    res.status(201).json({ success: true, message: "Message sent", data: newMsg });
  } catch (err) {
    console.error('sendMessage error:', err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const list = await Contact.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const msg = await Contact.findByIdAndDelete(req.params.id);
    if (!msg) return res.status(404).json({ message: "Not found" });

    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
