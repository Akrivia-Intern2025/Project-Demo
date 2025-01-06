const express = require("express");
const { register, login } = require("../controllers/authController");
const verifyToken = require("../middlewares/authmiddlewares");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/profile", verifyToken, (req, res) => {
    const sql = `SELECT id, email FROM users WHERE id = ?`;
    db.query(sql, [req.user.id], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error!" });
        if (result.length === 0) return res.status(404).json({ error: "User not found!" });
        res.status(200).json({ user: result[0] });
    });
});

module.exports = router;
