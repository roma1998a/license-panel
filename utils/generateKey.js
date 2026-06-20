const crypto = require('crypto');

/**
 * Generate random license key
 * Format: XXXX-XXXX-XXXX-XXXX
 */
function generateKey() {
    const part = () => {
        return crypto.randomBytes(2).toString('hex').toUpperCase();
    };

    return `${part()}${part()}-${part()}${part()}-${part()}${part()}-${part()}${part()}`;
}

module.exports = generateKey;
