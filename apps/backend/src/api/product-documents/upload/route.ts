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
        // Read data from request body
        const { product_id, documents } = req.body;

        // Prepare queries to save each document to the database
        const queries = documents.map(doc => {
            return pool.query(
                `INSERT INTO document (file_name, language, document_type, product_id, created_at, updated_at, deleted_at) 
                VALUES ($1, $2, $3, $4, NOW(), NOW(), NULL)`,
                [doc.file_name, doc.language, doc.document_type, product_id]
            );
        });

        // Execute all queries asynchronously
        await Promise.all(queries);

        // Return response after saving data
        res.status(200).json({
            message: 'Documents saved successfully.',
        });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({
            message: 'An error occurred while processing the request.',
            error: error.message, // Avoid exposing sensitive error details in production
        });
    }
};
