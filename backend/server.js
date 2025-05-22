import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.VITE_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Verify database connection
pool.connect((err, client, done) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Successfully connected to database');
    done();
  }
});

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.get('/fetchAllUsers', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error('Error with query', err);
    res.status(500).json({
      error: err.message,
    });
  }
});

app.get('/fetchAllNames', async (req, res) => {
  try {
    const result = await pool.query('SELECT name FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error('Error with query', err);
    res.status(500).json({
      error: err.message,
    });
  }
});

app.get('/fetchAllAges', async (req, res) => {
  try {
    const result = await pool.query('SELECT age FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error('Error with query', err);
    res.status(500).json({
      error: err.message,
    });
  }
});

const PORT = process.env.VITE_PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
