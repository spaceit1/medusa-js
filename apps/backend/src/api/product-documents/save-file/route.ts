import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import formidable from "formidable";
import fs from "fs";
import path from "path";

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
    const uploadDir = path.join(__dirname, '../../../../uploads/documents'); // Ensure this is the correct directory

    // Create the upload directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const form = formidable({
        uploadDir: uploadDir,
        keepExtensions: true,
        filename: (name, ext, part) => part.originalFilename || `file-${Date.now()}${ext}`,
    });

    form.parse(req, (err, fields, files) => {
        if (err) {
            console.error("Error parsing the files:", err);
            return res.status(500).json({ error: "File upload failed", details: err.message });
        }

        // Ensure the files are being saved correctly
        console.log('Files received:', files);

        // Respond with success
        return res.status(200).json({ fields, files });
    });
};