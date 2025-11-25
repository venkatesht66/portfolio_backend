const express = require('express');
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

dotEnv.config();
const authController = require('./controllers/authController');

const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const contactRoutes = require('./routes/contactRoutes');
const adminRoutes = require('./routes/adminRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const certificationRoutes = require('./routes/certificationRoutes');


const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://portfolio-snowy-eight-curyi5ea91.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/projects', projectRoutes);
app.use('/contact', contactRoutes);
app.use('/admin', adminRoutes);
app.use('/experiences', experienceRoutes);
app.use('/certifications', certificationRoutes);

app.use((err, req, res, next) => {
  console.error('GLOBAL ERROR HANDLER:', err && (err.stack || err.message || err));
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 4000;
const MONGO = process.env.MONGO_URI || '';

app.get("/", (req, res) => {
  res.send("Backend running");
});

mongoose.connect(MONGO)
  .then(async () => {
    console.log('Mongo connected');
    await authController.initAdmin();
    app.listen(PORT, () => console.log('Server running on port', PORT));
  })
  .catch(err => {
    console.error('DB connection error', err);
  });
