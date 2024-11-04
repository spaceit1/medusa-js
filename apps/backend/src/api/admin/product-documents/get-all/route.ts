import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { Pool } from "pg";
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, 
});


export const GET = async (req: any, res: any) => {
    
    let product_id = req.query.product_id;

    try {
        let sql = `SELECT DISTINCT file_id as id, file_name, language, document_type FROM file;`;
        let result = await pool.query(sql);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
    
};
