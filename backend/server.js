const express = require('express');
const cors = require('cors');
const db = require('./db');
const wordsRouter = require('./routes/words');
const scoresRouter = require('./routes/scores');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/words', wordsRouter);
app.use('/scores', scoresRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
