const crypto = require('crypto');
const License = require('../models/licenseModel');

/**
 * Generate random license key
 */
exports.generateKey = () => {
    return crypto.randomBytes(16).toString('hex').toUpperCase();
};

/**
 * Create license in DB
 */
exports.createLicense = async ({ expiresAt = null, owner = null }) => {
    const key = this.generateKey();

    const license = new License({
        key,
        status: 'active',
        expiresAt,
        owner,
        deviceId: null
    });

    await license.save();

    return license;
};

/**
 * Validate license key
 */
exports.validateLicense = async (key) => {
    const license = await License.findOne({ key });

    if (!license) {
        return {
            valid: false,
            message: 'Invalid license key'
        };
    }

    if (license.status === 'disabled') {
        return {
            valid: false,
            message: 'License disabled'
        };
    }

    if (license.expiresAt && new Date(license.expiresAt) < new Date()) {
        return {
            valid: false,
            message: 'License expired'
        };
    }

    return {
        valid: true,
        message: 'License valid',
        data: license
    };
};

/**
 * Disable license
 */
exports.disableLicense = async (id) => {
    const license = await License.findById(id);

    if (!license) {
        return null;
    }

    license.status = 'disabled';
    await license.save();

    return license;
};

/**
 * Bind license to device (HWID style)
 */
exports.bindDevice = async (key, deviceId) => {
    const license = await License.findOne({ key });

    if (!license) {
        return null;
    }

    if (!license.deviceId) {
        license.deviceId = deviceId;
        await license.save();
    }

    return license;
};
