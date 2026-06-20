const mongoose = require('mongoose');

/**
 * License Schema
 */
const licenseSchema = new mongoose.Schema(
    {
        key: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        status: {
            type: String,
            enum: ['active', 'disabled'],
            default: 'active'
        },

        expiresAt: {
            type: Date,
            default: null
        },

        owner: {
            type: String,
            default: null
        },

        deviceId: {
            type: String,
            default: null
        }
    },
    {
        timestamps: true
    }
);

/**
 * Model
 */
const License = mongoose.model('License', licenseSchema);

module.exports = License;
