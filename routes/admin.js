const express = require('express');
const router = express.Router();

/**
 * @route   GET /api/admin
 * @desc    Test admin route
 */
router.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Admin route is working'
    });
});

/**
 * @route   POST /api/admin/login
 * @desc    Fake admin login (بدون DB حالياً)
 */
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // بيانات بسيطة للتجربة
    const ADMIN_USER = 'admin';
    const ADMIN_PASS = '1234';

    if (username === ADMIN_USER && password === ADMIN_PASS) {
        return res.json({
            success: true,
            message: 'Login successful',
            token: 'fake-token-12345'
        });
    }

    return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
    });
});

/**
 * @route   GET /api/admin/dashboard
 * @desc    Fake protected route
 */
router.get('/dashboard', (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to admin dashboard'
    });
});

module.exports = router;
