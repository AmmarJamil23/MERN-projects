const http = require('http');
const app = require('./app');
const connectDB = require('./config/db');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

connectDB();

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`ChatWave backend running at http://localhost:${PORT}`);
})