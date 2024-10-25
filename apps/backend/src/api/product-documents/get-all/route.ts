import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { Pool } from "pg";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();
// Initialize PostgreSQL connection pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Ensure this environment variable is set
});

// Handle POST request
export const GET = async (req: any, res: any) => {
    
    try {
        //let id = req.body.product_id;

        let sql = `SELECT * FROM document`;
        let result = await pool.query(sql);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
    
};
