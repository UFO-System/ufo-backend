const db = require('../config/db');

function insertDepositTransaction(data) {
    return new Promise((resolve, reject) => {
        const sql = '계좌 정보로 아이디 찾아 Insert 하는 sql문';
        db.query(sql, data, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
    return;
}

let io;

function setIO(IO) {
    io = IO;
}

async function emitDepositEvent(data) {
    if (io) {
        const results = await insertDepositTransaction(data);
        io.to(results).emit('depositEvent', data);
    }
}

module.exports = { setIO, emitDepositEvent };