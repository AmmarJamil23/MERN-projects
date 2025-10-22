const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/mongoose');
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/project');

const app = express();

app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://mern-devconnect.vercel.app"
  ],
  credentials: true
}));


connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

app.get('/', (req, res) => {
  res.send('DevConnect backend is running and is connected to MongoDB');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
