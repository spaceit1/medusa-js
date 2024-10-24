import { Router } from "express";
import { uploadFile } from "@medusajs/medusa";

const router = Router();

// POST route for file uploads
router.post("/files", uploadFile(), async (req, res) => {
  try {
    // `req.files` contains the uploaded files
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded." });
    }

    // You can process the files here (e.g., save file details to the database)

    return res.status(200).json({ message: "Files uploaded successfully.", files });
  } catch (error) {
    return res.status(500).json({ message: "Error uploading files.", error: error.message });
  }
});

export default router;
