const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /words/random
router.get('/random', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM words ORDER BY RAND() LIMIT 1');
    if (rows.length === 0) return res.status(404).json({ error: 'No words found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// GET /words
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM words LIMIT 100');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

module.exports = router;
