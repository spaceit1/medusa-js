import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { Pool } from "pg";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Konfiguracja CORS
const corsOptions = {
    origin: process.env.STORE_CORS,
    credentials: true,
};

export const POST = async (req: any, res: any) => {
    // Zastosowanie CORS
    cors(corsOptions)(req, res, async () => {
        try {
            let id = req.body.product_id;
            let sql = `SELECT * FROM document WHERE product_id = $1`;
            let result = await pool.query(sql, [id]);
            res.status(200).json(result.rows);
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    });
};

// Dodanie obsługi OPTIONS dla preflight requests
export const OPTIONS = cors(corsOptions);

// Wyłączenie domyślnej obsługi CORS Medusa
export const CORS = false;