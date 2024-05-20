const db = require('../config/db');

function requestOrderQuery(data) {
    return new Promise((resolve, reject) => {
        const sql = '오더 추가 sql문';
        db.query(sql, data, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
}
function acceptOrderQuery(data) {
    return new Promise((resolve, reject) => {
        const sql = '오더 수락 sql문';
        db.query(sql, data, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
}
function declineOrderQuery(data) {
    return new Promise((resolve, reject) => {
        const sql = '오더 거절 sql문';
        db.query(sql, data, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
}
function completeOrderQuery(data) {
    return new Promise((resolve, reject) => {
        const sql = '오더 완료 sql문';
        db.query(sql, data, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
}

module.exports = (socket) => {
    socket.on("requestOrder", async (data) => {
        try {
            const results = await requestOrderQuery(data);
            socket.emit("requestOrderResponse", results);
        } catch (err) {
            socket.emit("error", "Database query failed.");
            console.error(err);
        }
    })

    socket.on("acceptOrder", async (data) => {
        try {
            const results = await acceptOrderQuery(data);
            socket.emit("acceptOrderResponse", results);
        } catch (err) {
            socket.emit("error", "Database query failed.");
            console.error(err);
        }
    });

    socket.on("declineOrder", async (data) => {
        try {
            const results = await declineOrderQuery(data);
            socket.emit("declineOrderResponse", results);
        } catch (err) {
            socket.emit("error", "Database query failed.");
            console.error(err);
        }
    })

    socket.on("completeOrder", async (data) => {
        try {
            const results = await completeOrderQuery(data);
            socket.emit("completeOrderResponse", results);
        } catch (err) {
            socket.emit("error", "Database query failed.");
            console.error(err);
        }
    })
};
