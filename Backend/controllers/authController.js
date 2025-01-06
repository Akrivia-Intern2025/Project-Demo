const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { createUser, findUserByEmail } = require("../models/userModel");
const JWT_SECRET = process.env.JWT_SECRET;

// Register User
const register = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required!" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        createUser({ email, password: hashedPassword }, (err) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(409).json({ error: "Email already exists!" });
                }
                return res.status(500).json({ error: "Database error!" });
            }
            res.status(201).json({ message: "User registered successfully!" });
        });
    } catch (err) {
        res.status(500).json({ error: "Internal server error!" });
    }
};

// Login User
const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email,password)
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required!" });
    }

    findUserByEmail(email, async (err, results) => {
        if (err) return res.status(500).json({ error: "Database error!" });
        if (results.length === 0) return res.status(401).json({ error: "Invalid credentials!" });

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials!" });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ message: "Login successful!", token });
    });
};

module.exports = { register, login };
