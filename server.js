const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/admin', require('./routes/admin'));
app.use('/api/license', require('./routes/license'));

// Pages
app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname,'public/login.html'));
});

app.get('/dashboard', (req,res)=>{
    res.sendFile(path.join(__dirname,'public/dashboard.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log('Running on ' + PORT));
