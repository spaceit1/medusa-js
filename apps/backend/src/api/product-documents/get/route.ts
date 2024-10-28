import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { Pool } from "pg";
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, 
});

export const POST = async (req: any, res: any) => {
    
    try {
        let id = req.body.product_id;

        let sql = `SELECT * FROM document WHERE product_id = '${id}'`;
        let result = await pool.query(sql);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
    
};
