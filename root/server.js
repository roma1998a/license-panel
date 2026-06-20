require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');

// DB connection (إذا تستخدم MongoDB)
const connectDB = require('./config/db');

// Routes
const adminRoutes = require('./routes/admin');
const licenseRoutes = require('./routes/license');
const authRoutes = require('./routes/auth');

// Connect DB
connectDB();

// App init
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files (frontend)
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/admin', adminRoutes);
app.use('/api/license', licenseRoutes);
app.use('/api/auth', authRoutes);

// Pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error'
    });
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
