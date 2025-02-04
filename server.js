const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { Worker } = require('worker_threads');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const worker = new Worker(path.join(__dirname, 'workers', 'ultravox.js'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/fibonacci', (req, res) => {
  res.render('fibonacci');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('message', (msg) => {
    worker.postMessage(msg);
  });

  worker.on('message', (response) => {
    socket.emit('message', response);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
