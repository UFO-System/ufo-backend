const db = require('../config/db');

function getOrderListQuery(data) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM `OrderTable` WHERE admin_id = ?;';
        const params = [data.adminId];
        db.query(sql, data, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
}
function requestOrderQuery(data) {
    return new Promise((resolve, reject) => {
        const sql = 'CALL createOrder(?, ?, CURDATE(), ?, ?, ?);';
        const params = [data.adminId, data.isAccept, data.tableNum, data.bank_name, data.menu];

        db.query(sql, params, (err, results) => {
            if (err) {
                return reject(err);
            }
            const statusMessage = results[1][0].statusMessage;
            resolve({ results: results[0], statusMessage });
        });
    });
}
function acceptOrderQuery(data) {
    return new Promise((resolve, reject) => {
        const sql = 'CALL acceptOrder(?, @result); SELECT @result AS result;';
        const params = [data.orderId];
        
        db.query(sql, params, (err, results) => {
            if (err) {
                return reject(err);
            }
            const resultMessage = results[1][0].result;
            resolve({ results: results[0], resultMessage});
        });
    });
}
function declineOrderQuery(data) {
    return new Promise((resolve, reject) => {
        const sql = 'CALL rejectOrder(?);';
        const params = [data.orderId];
        db.query(sql, data, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
}
function completeOrderQuery(data) {
    return new Promise((resolve, reject) => {
        const sql = 'CALL completeOrder(?);';
        const params = [data.orderId];
        db.query(sql, data, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
}

module.exports = (socket) => {
    socket.on("getOrderList", async (data) => {
        try {
            const results = await getOrderListQuery(data);
            socket.emit("getOrderListResponse", results);
        } catch (err) {
            socket.emit("error", "Database query failed.");
            console.error(err);
        }
    })

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
