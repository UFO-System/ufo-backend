const db = require('../config/db');

async function getMenuListQuery(data) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT M.menu_name, O.order_cnt FROM `Order` O JOIN `Menu` M ON O.menu_id = M.menu_id AND O.admin_id = M.admin_id = ?';
        db.query(sql, data, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
}
async function addMenusQuery(data) {
    return new Promise((resolve, reject) => {
        const sql = 'CALL InsertMenu(?, ?, ?, @statusMessage); SELECT @statusMessage AS statusMessage;';
        const params = [data.adminId, data.menuName, data.price];
        
        db.query(sql, params, (err, results) => {
            if (err) {
                return reject(err);
            }
            const statusMessage = results[1][0].statusMessage;
            resolve({ results: results[0], statusMessage });
        });
    });
}
async function deleteMenusQuery(data) {
    return new Promise((resolve, reject) => {
        const sql = 'CALL DeleteMenu(?, ?, @statusMessage); SELECT @statusMessage AS statusMessage;';
        const params = [data.adminId, data.menuId];

        db.query(sql, params, (err, results) => {
            if (err) {
                return reject(err);
            }
            const statusMessage = results[1][0].statusMessage;
            resolve({ results: results[0], statusMessage });
        });
    });
}

module.exports = (socket) => {
    socket.on("getMenuList", async (adminId) => {
        try {
            const results = await getMenuListQuery(adminId);
            socket.emit("getMenuListResponse", results);
        } catch (err) {
            socket.emit("error", "Database query failed.");
            console.error(err);
        }
    });

    socket.on("addMenu", async (data) => {
        try {
            const results = await addMenusQuery(adminId);
            socket.emit("addMenusResponse", results);
        } catch (err) {
            socket.emit("error", "Database query failed.");
            console.error(err);
        }
    });

    socket.on("deleteMenu", async (data) => {
        try {
            const results = await deleteMenusQuery(adminId);
            socket.emit("deleteMenuResponse", results);
        } catch (err) {
            socket.emit("error", "Database query failed.");
            console.error(err);
        }
    });
};
