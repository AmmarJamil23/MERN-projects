const http = require('http');
const app = require('./app');
const connectDB = require('./config/db');
const { Server } = require('socket.io');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

connectDB();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST']
    }
});

//This is the Socket Authentication middleware
io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    const jwt = require('jsonwebtoken');
    const User = require('./models/User');

    if (!token){
        return next(new Error('No token provided'));
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.userId = decoded.id;
        next();

    } catch (error){
        next(new Error('Invalid token'));

    }
});


//This is the socket event handler
io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.userId}`);

    socket.join(socket.userId.toString());

    socket.on('send_message', (data) => {
        const { conversationId, senderId, recipientId, text } = data;

        io.to(recipientId).emit('receive_message', {
            conversationId,
            senderId,
            text,
            createdAt: new Date().toISOString()

        });
    });
    socket.on('disconnect', () => {
        console.log(`User disconnnected: ${socket.userId}`);
    });
});


server.listen(PORT, () => {
    console.log(`Chatwave backend running at http://localhost:${PORT}`);
})