require('dotenv').config();

/**
 * App Config
 */
const config = {
    port: process.env.PORT || 3000,

    mongoURI: process.env.MONGO_URI,

    jwtSecret: process.env.JWT_SECRET || 'default_secret',

    appName: process.env.APP_NAME || 'License Panel',

    nodeEnv: process.env.NODE_ENV || 'development'
};

module.exports = config;
