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
export const POST = async (req: any, res: any) => {
    try {
        const id = req.body.id; // Upewnij się, że to jest ID dokumentu do usunięcia
        const file_name = req.body.file_name;

        // Prepare SQL query
        const sql = `DELETE FROM document WHERE file_name = $1 AND id = $2`;
        
        // Execute query with parameters
        const result = await pool.query(sql, [file_name, id]);

        // Respond with a success message
        res.status(200).json({ message: 'Document deleted successfully', affectedRows: result.rowCount });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
