const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let mobile = "";

// 정적 파일 라우팅
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  
  app.get('/notebook', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notebook.html'));
  });

  app.get('/kitchen', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'kitchen.html'));
  });

io.on("connection", (socket) => {
  console.log("클라이언트 연결");

  socket.on("click", (data) => {
    console.log("[요청] " + data);

    io.emit("sendNotebook", data);
  })

  socket.on("order", (data) => {
    console.log("[수락] " + data);

    io.emit("sendKitchen", data);
  })

  socket.on("disconnect", () => {
    console.log("클라이언트 연결 종료");
  });
});

server.listen(3000, () => {
  console.log("서버가 3000번 포트에서 실행중입니다.");
});