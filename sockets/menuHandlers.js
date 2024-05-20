const db = require('../config/db');

async function getMenuListQuery(data) {
    return new Promise((resolve, reject) => {
        const sql = '메뉴 리스트 검색 sql문';
        db.query(sql, data, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
}
async function addMenusQuery(data) {
    return new Promise((resolve, reject) => {
        const sql = '메뉴 추가 sql문';
        db.query(sql, data, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
}
async function deleteMenusQuery(data) {
    return new Promise((resolve, reject) => {
        const sql = '메뉴 삭제 sql문';
        db.query(sql, data, (err, results) => {
            if (err) reject(err);
            resolve(results);
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
            const results = await deleteMenuQuery(adminId);
            socket.emit("deleteMenuResponse", results);
        } catch (err) {
            socket.emit("error", "Database query failed.");
            console.error(err);
        }
    });
};
