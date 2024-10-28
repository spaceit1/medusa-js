import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { Pool } from "pg";
import dotenv from 'dotenv';


dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, 
});

export const POST = async (req: any, res: any) => {
    try {
        const id = req.body.id; 
        const file_name = req.body.file_name;

        const sql = `DELETE FROM document WHERE file_name = $1 AND id = $2`;
        const result = await pool.query(sql, [file_name, id]);

        res.status(200).json({ message: 'Document deleted successfully', affectedRows: result.rowCount });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
