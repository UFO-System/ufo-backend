const apiHandlers = require('./apiHandlers');
const menuHandlers = require('./menuHandlers');
const orderHandlers = require('./orderHandlers');
const db = require('../config/db');

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("클라이언트 연결");

    apiHandlers(socket);
    menuHandlers(socket);
    orderHandlers(socket);

    socket.on("disconnect", () => {
        console.log("클라이언트 연결 종료");
    });
  });
};
