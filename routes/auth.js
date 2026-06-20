const express = require('express');
const router = express.Router();

// Fake users DB (للتجربة فقط)
let users = [];

/**
 * @route   POST /api/auth/register
 * @desc    Register new user
 */
router.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: 'Username and password are required'
        });
    }

    const exists = users.find(u => u.username === username);

    if (exists) {
        return res.status(409).json({
            success: false,
            message: 'User already exists'
        });
    }

    const newUser = {
        id: Date.now(),
        username,
        password // ⚠️ بدون تشفير حالياً (للتجربة فقط)
    };

    users.push(newUser);

    res.json({
        success: true,
        message: 'User registered successfully',
        data: newUser
    });
});

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 */
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(
        u => u.username === username && u.password === password
    );

    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'Invalid credentials'
        });
    }

    res.json({
        success: true,
        message: 'Login successful',
        token: 'fake-jwt-token-12345',
        user: {
            id: user.id,
            username: user.username
        }
    });
});

/**
 * @route   GET /api/auth/users
 * @desc    Get all users (admin test only)
 */
router.get('/users', (req, res) => {
    res.json({
        success: true,
        data: users
    });
});

module.exports = router;
