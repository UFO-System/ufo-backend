const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");

var mysql = require('mysql')
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

var connection = mysql.createConnection({
  host: "localhost",
  user: "OrderSystem",
  database: "OrderSystem",
  password: "OrderSystem",
  port: 3306,
  timezone:"Asia/Seoul",
  dateStrings:true
});

// 정적 파일 라우팅
app.use(express.static(path.join(__dirname, 'public')));

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

  var sql = 'SELECT M.menu_name, O.order_cnt, (M.price * O.order_cnt) AS total_price FROM `Order` O JOIN `Menu` M ON O.menu_id = M.menu_id AND O.admin_id = M.admin_id;';

  connection.query(sql, function (err, result) {
    var resultCode = 404;
    var message = '[실패] 에러가 발생했습니다';
    if (err) {
        console.log(err);
    } else {
        resultCode = 200;
        message = '[성공] SQL에서 오더 리스트 불러오기 완료.';
    }
    if(result != '') console.log(result.reduce((a, b) => a + b.total_price, 0));
    console.log(message);
  })

  socket.on("click", (order) => {
    console.log("[요청] " + order);

    io.emit("sendNotebook", order);
  })

  socket.on("order", (order) => {
    console.log("[수락] " + order);

    io.emit("sendKitchen", order); 
  })

  socket.on("disconnect", () => {
    console.log("클라이언트 연결 종료");
  });
});

server.listen(3000, () => {
  console.log("서버가 3000번 포트에서 실행중입니다.");
});