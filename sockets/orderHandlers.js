const db = require('../config/db');

function queryOrderList(admin_id) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM `Order` WHERE admin_id = ?';
        db.query(sql, [admin_id], (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
}

function queryOrderInsert(admin_id) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO `Order(order_num, menu_id, admin_id, order_table, order_date, order_state, order_cnt) values(?, ?, ?, ?, ?, ?, ?)`';
        db.query(sql, [admin_id], (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
}

function queryOrderDelete(admin_id) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM `Order` WHERE order_id = ?';
        db.query(sql, [admin_id], (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
}

module.exports = (socket) => {
    socket.on("orderList", async (admin_id) => {
        try {
            const results = await queryOrderList(admin_id);
            socket.emit("orderListResponse", results);
        } catch (err) {
            socket.emit("error", "Database query failed.");
            console.error(err);
        }
    });

    socket.on("orderInsert", async (admin_id) => {
        try {
            const results = await queryOrderInsert(admin_id);
            socket.emit("orderInsertResponse", results);
        } catch (err) {
            socket.emit("error", "Database query failed.");
            console.error(err);
        }
    })

    socket.on("orderDelete", async (admin_id) => {
        try {
            const results = await queryOrderDelete(admin_id);
            socket.emit("orderDeleteResponse", results);
        } catch (err) {
            socket.emit("error", "Database query failed.");
            console.error(err);
        }
    })
};
