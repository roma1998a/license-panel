let licenses = []; // Fake DB (مؤقت للتجربة)

/**
 * @desc Get all licenses
 */
exports.getAllLicenses = (req, res) => {
    res.json({
        success: true,
        data: licenses
    });
};

/**
 * @desc Create new license
 */
exports.createLicense = (req, res) => {
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
};

/**
 * @desc Validate license
 */
exports.validateLicense = (req, res) => {
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
        message: 'License is valid',
        data: license
    });
};

/**
 * @desc Delete license
 */
exports.deleteLicense = (req, res) => {
    const { id } = req.params;

    const index = licenses.findIndex(l => l.id == id);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: 'License not found'
        });
    }

    licenses.splice(index, 1);

    res.json({
        success: true,
        message: 'License deleted'
    });
};

/**
 * @desc Disable license
 */
exports.disableLicense = (req, res) => {
    const { id } = req.params;

    const license = licenses.find(l => l.id == id);

    if (!license) {
        return res.status(404).json({
            success: false,
            message: 'License not found'
        });
    }

    license.status = 'disabled';

    res.json({
        success: true,
        message: 'License disabled',
        data: license
    });
};
