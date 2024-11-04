import { Pool } from "pg";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const corsOptions = {
    origin: process.env.STORE_CORS,
    credentials: false,
};

export const GET = async (req: any, res: any) => {
    res.status(200).json({ message: "Hello, Medusa!" });
};

// Dodanie obsługi OPTIONS dla preflight requests
export const OPTIONS = cors(corsOptions);

// Wyłączenie domyślnej obsługi CORS Medusa
export const CORS = false;