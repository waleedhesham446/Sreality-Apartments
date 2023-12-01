const express = require('express');
const cors = require('cors');
const { pool } = require('./database');

const app = express();

app.use(cors());

app.get('/', async (req, res) => {
  try {
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 10;
    
    const apartments = await pool.query('SELECT * from apartments OFFSET $1 LIMIT $2;', [offset, limit]);
    res.status(200).json(apartments.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'something went wrong..., try again', error });
  }
});

const PORT = 3000;

app.listen(PORT, () => console.log(`server running on ${PORT}`));