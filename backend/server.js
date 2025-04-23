import express from 'express'
import path from 'path';
import pkg from 'pg';
import cors from "cors";
import dotenv from "dotenv";

const { Pool } = pkg;

dotenv.config()

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

console.log(port)

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});



try {
    await pool.connect();
    console.log("Connected to Neon PostgreSQL")
} catch (error) {
    console.error("Database connection error", error.stack);
}



// Select Statements
app.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM coins");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

app.get("/headCount", async (req, res) => {
    try {
        const headsResult = await pool.query("SELECT COUNT(*) FROM coins WHERE coins.\"coinSide\" = 'heads'");
        res.json(headsResult.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

app.get("/tailCount", async (req, res) => {
    try {
        const tailsResult = await pool.query("SELECT COUNT(*) FROM coins WHERE coins.\"coinSide\" = 'tails'");
        res.json(tailsResult.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

app.get("/totalCount", async (req, res) => {
    try {
        const tailsResult = await pool.query("SELECT COUNT(*) FROM coins");
        res.json(tailsResult.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

app.get("/lastFlip", async (req, res) => {
    try {
        const tailsResult = await pool.query("SELECT * FROM coins ORDER BY id DESC LIMIT 1");
        res.json(tailsResult.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});





// Insert Statements
app.get("/tailsFlipped", async (req, res) => {
    try {
        let date = new Date();
        const tailsInsert = await pool.query('INSERT INTO coins ("coinSide", "dateFlipped") VALUES ($1, $2) RETURNING *', ['tails', date]);
        res.status(201).json(tailsInsert.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

app.get("/headsFlipped", async (req, res) => {
    try {
        let date = new Date();
        const headsInsert = await pool.query('INSERT INTO coins ("coinSide", "dateFlipped") VALUES ($1, $2) RETURNING *', ['heads', date]);
        res.status(201).json(headsInsert.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});






app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});

