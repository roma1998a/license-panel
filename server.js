const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();



const app = express();
app.use(bodyParser.json());


app.get('/', (req,res)=>{
  res.send('License Panel Running 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log('Running on '+PORT));
