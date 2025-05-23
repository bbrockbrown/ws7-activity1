import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
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

app.post('/createNewUser', async (req, res) => {
  try {
    const { name, email, age } = req.body;
    
    if (!name || !email || !age) {
      return res.status(400).json({
        error: 'Name, email, and age are required'
      });
    }

    const result = await pool.query('INSERT INTO users (name, email, age) VALUES ($1, $2, $3)',
      [name, email, age]
    );

    res.status(201).json(result);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({
      error: err instanceof Error ? err.message : 'Unknown error'
    });
  }
});

const PORT = process.env.VITE_PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
