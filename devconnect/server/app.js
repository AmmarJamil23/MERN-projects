const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/mongoose');
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/project');

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

app.get('/', (req, res) => {
  res.send('DevConnect backend is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
