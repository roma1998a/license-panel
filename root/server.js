require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static
app.use(express.static(path.join(__dirname, 'public')));

// Routes (حماية من crash)
try {
    app.use('/api/admin', require('./routes/admin'));
    app.use('/api/license', require('./routes/license'));
    app.use('/api/auth', require('./routes/auth'));
} catch (e) {
    console.error("ROUTES ERROR:", e.message);
}

// Pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// TEST ROUTE (مهم جداً)
app.get('/ping', (req, res) => {
    res.send('OK');
});

// PORT (هذا أهم سطر)
const PORT = process.env.PORT || 3000;

// لازم Render يسمع هنا
app.listen(PORT, '0.0.0.0', () => {
    console.log("Server running on port:", PORT);
});
