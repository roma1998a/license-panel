require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');

// App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
try {
    app.use('/api/admin', require('./routes/admin'));
    app.use('/api/license', require('./routes/license'));
    app.use('/api/auth', require('./routes/auth'));
} catch (err) {
    console.error('Route load error:', err.message);
}

// Pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Health check (مهم لـ Render)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// PORT (مهم جداً لـ Render)
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
