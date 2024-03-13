const express = require('express');
const app = express();
const { PORT } = require('./config/config');
const http = require('http').createServer(app);
const auth = require('./middlewares/auth')
const routes = require('./routes');
const socket = require("socket.io");
const io = require('socket.io')(http); // Import and initialize 'io'
require("dotenv").config();
require('./config/express')(app);
require('./config/mongoose');
app.use(auth())
app.use(routes);

// Handle Socket.IO events
io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Example: handle chat message event
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        // Broadcast the message to all connected clients
        io.emit('chat message', msg);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server
const server = http.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}...`);
});