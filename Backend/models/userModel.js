const db = require("../utils/db");

const createUser = (userData, callback) => {
    const { email, password } = userData;
    const sql = `INSERT INTO users (email, password) VALUES (?, ?)`;

    db.query(sql, [email, password], callback);
};

const findUserByEmail = (email, callback) => {
    const sql = `SELECT * FROM users WHERE email = ?`;
    db.query(sql, [email], callback);
};

module.exports = { createUser, findUserByEmail };
