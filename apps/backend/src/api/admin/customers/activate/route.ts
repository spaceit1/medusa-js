import { Pool } from "pg";
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export const POST = async (req: any, res: any) => {
    
    const usersId: string[] = req.body.customerIds;

    usersId.forEach(async (userId) => {
        const sql = `
            UPDATE customer SET approved = true WHERE id = '${userId}';
        `;
        await pool.query(sql);
    });

    res.status(200).json({ message: 'Success' });

};