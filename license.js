const express = require('express');
const router = express.Router();
const db = require('../db');

// create key
router.post('/create', async (req,res)=>{
  const { type } = req.body;

  let days = 1;
  if(type === 'week') days = 7;
  if(type === 'month') days = 30;

  const key = Math.random().toString(36).substring(2,10).toUpperCase();

  const exp = new Date();
  exp.setDate(exp.getDate() + days);

  await db.query(
    'INSERT INTO license_keys (license_key,type,expires_at,status) VALUES ($1,$2,$3,$4)',
    [key,type,exp,'active']
  );

  res.json({key,type,exp});
});

// check key
router.post('/check', async (req,res)=>{
  const { key } = req.body;

  const r = await db.query('SELECT * FROM license_keys WHERE license_key=$1',[key]);

  if(r.rows.length===0) return res.json({valid:false});

  const data = r.rows[0];

  if(data.status !== 'active') return res.json({valid:false,reason:'disabled'});
  if(new Date(data.expires_at) < new Date()) return res.json({valid:false,reason:'expired'});

  res.json({valid:true,data});
});

// disable
router.post('/disable', async (req,res)=>{
  const { key } = req.body;

  await db.query("UPDATE license_keys SET status='disabled' WHERE license_key=$1",[key]);

  res.json({ok:true});
});

module.exports = router;
