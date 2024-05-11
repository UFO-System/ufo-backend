const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const db = require('./config/db');
const apiRouter = require('./routes/api');
const indexRouter = require('./routes/index');
const notebookRouter = require('./routes/notebook');
const kitchenRouter = require('./routes/kitchen');
const setupWebSocket = require('./sockets');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));
app.use(cors())


app.use('/api', apiRouter);
app.use('/', indexRouter);
app.use('/notebook', notebookRouter);
app.use('/kitchen', kitchenRouter);

setupWebSocket(io);

server.listen(3000, () => {
  console.log("서버가 3000번 포트에서 실행중입니다.");
});