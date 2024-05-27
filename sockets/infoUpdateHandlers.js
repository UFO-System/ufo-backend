const db = require('../config/db');

async function updateAdminInfoQuery(data) {
    return new Promise((resolve, reject) => {
        const sql = 'CALL UpdateAdminInfo(?, ? , ?, ?, ?, REPLACE(?, "-", ""), REPLACE(?, "-", ""), ?, @status_message); SELECT @status_message AS statusMessage;';
        const params = [data.adminId, data.password, data.newPassword, data.adminName, data.bank_name, data.bank_account, data.phone_number, data.member];

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
    socket.on("updateAdminInfo", async (data) => {
        try {
            const results = await updateAdminInfoQuery(data);
            socket.emit("updateAdminInfoResponse", results);
        } catch (err) {
            socket.emit("error", "Database query failed.");
            console.error(err);
        }
    });
};
