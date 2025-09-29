const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /scores
router.post('/', async (req, res) => {
  const { player_name, game, points } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO scores (player_name, game, points) VALUES (?, ?, ?)',
      [player_name, game, points]
    );
    res.json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// GET /scores
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM scores ORDER BY points DESC LIMIT 50');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

module.exports = router;
