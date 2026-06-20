const express = require('express');
const router = express.Router();

// Fake DB (مؤقت للتجربة)
let licenses = [];

/**
 * @route   GET /api/license
 * @desc    Get all licenses
 */
router.get('/', (req, res) => {
    res.json({
        success: true,
        data: licenses
    });
});

/**
 * @route   POST /api/license/create
 * @desc    Create new license key
 */
router.post('/create', (req, res) => {
    const { key, expiresAt } = req.body;

    if (!key) {
        return res.status(400).json({
            success: false,
            message: 'License key is required'
        });
    }

    const newLicense = {
        id: Date.now(),
        key,
        status: 'active',
        expiresAt: expiresAt || null,
        createdAt: new Date()
    };

    licenses.push(newLicense);

    res.json({
        success: true,
        message: 'License created successfully',
        data: newLicense
    });
});

/**
 * @route   POST /api/license/validate
 * @desc    Validate license key
 */
router.post('/validate', (req, res) => {
    const { key } = req.body;

    const license = licenses.find(l => l.key === key);

    if (!license) {
        return res.status(404).json({
            success: false,
            message: 'Invalid license key'
        });
    }

    // check expiry
    if (license.expiresAt && new Date(license.expiresAt) < new Date()) {
        return res.status(400).json({
            success: false,
            message: 'License expired'
        });
    }

    res.json({
        success: true,
        message: 'License valid',
        data: license
    });
});

/**
 * @route   DELETE /api/license/:id
 * @desc    Delete license
 */
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    licenses = licenses.filter(l => l.id != id);

    res.json({
        success: true,
        message: 'License deleted'
    });
});

module.exports = router;
