const db = require('../config/db');

function findAccountInfo(data) {
    return new Promise((resolve, reject) => {
        const sql = '계좌 정보로 아이디 찾는 쿼리';
        db.query(sql, [data], (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
}

module.exports = (socket) => {
    async function emitDepositEvent(data){
        if (io) {
            const results = await findAccountInfo(data);
            io.to(results).emit('depositEvent', data);
        }
    }
};
