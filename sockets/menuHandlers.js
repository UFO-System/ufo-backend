const db = require('../config/db');

async function queryMenus(adminId) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT M.menu_name, O.order_cnt FROM `Order` O JOIN `Menu` M ON O.menu_id = M.menu_id AND O.admin_id = M.admin_id = ?';
        db.query(sql, [adminId], (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
}

module.exports = (socket) => {
    socket.on("menuList", async (adminId) => {
        try {
            const results = await queryMenus(adminId);
            socket.emit("menuListResponse", results);
        } catch (err) {
            socket.emit("error", "Database query failed.");
            console.error(err);
        }
    });
};
