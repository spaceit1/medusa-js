import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import { Pool } from "pg"; 

// Initialize PostgreSQL client
const pool = new Pool({
    user: 'postgres',        
    host: 'localhost',            
    database: 'medusa-backend',     
    password: 'admin',
    port: 5432,          
});

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {

    const uploadDir = path.join(__dirname, '../../../uploads'); // Ensure this is the correct directory

    // Create the upload directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const form = formidable({
        uploadDir: uploadDir, // Directory where the files will be uploaded
        keepExtensions: true, // Keep file extensions
        filename: (name, ext, part) => part.originalFilename || `file-${Date.now()}${ext}`, // Define how to name the files
    });

    
    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error("Error parsing the files:", err);
            return res.status(500).json({ error: "File upload failed", details: err.message });
        }

        try {
            // Iterate over the uploaded files and save metadata in the database
            for (const key in files) {
                if (files.hasOwnProperty(key)) {
                    const file: any = files[key]; // Get the file object
                    const filename = file.newFilename; // Formidable stores the file with this name in the upload directory
                    const language = fields.language || null; // Get language from form fields
                    const documentType = fields.documentType || null; // Get document type from form fields
                    const product_id = fields.product_id || null; // Get product ID (assuming you are linking files to products)

                    // Insert metadata into the PostgreSQL database
                    const query = `
                        INSERT INTO document (filename, language, document_type, product_id)
                        VALUES ($1, $2, $3, $4)
                        RETURNING id;
                    `;
                    const values = [filename, language, documentType, product_id];
                    const result = await pool.query(query, values);

                    // Log the ID of the inserted record
                    console.log(`File metadata saved with ID: ${result.rows[0].id}`);
                }
            }

            // Respond with success after all files have been processed
            return res.status(200).json({ message: 'Files uploaded and metadata saved successfully', files });
        } catch (dbError) {
            // Handle database errors
            console.error("Database error:", dbError);
            return res.status(400).json({ error: "Failed to save file metadata", details: dbError.message });
        }
    });

    
    res.status(200).json({ message: 'File uploaded successfully' });
};
