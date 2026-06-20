const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const licenseRoutes = require('./routes/license');

const app = express();
app.use(bodyParser.json());

app.use('/api/license', licenseRoutes);

app.get('/', (req,res)=>{
  res.send('License Panel Running 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log('Running on '+PORT));
