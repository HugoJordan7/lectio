import readingProgressDAO from "../readingProgressDAO.js";
import pool from '../../db/database.js';

export default class readingProgressDAOPostgreSQL extends readingProgressDAO {
    
    async getReadingProgress(id) { 
        const result = await pool.query(
        'SELECT id, user_email, book_id, current_page, status, date_start, date_end FROM reading_progress WHERE id = $1', 
        [id]
        );
        return result.rows[0] || null;
    }

    async getAllReadingProgresssByUserEmail(userEmail) { 
        const result = await pool.query(
        'SELECT * FROM reading_progress WHERE user_email = $1 ORDER BY date_start',
        [userEmail]
        );
        return result.rows;
    }

    async getAllReadingProgressByBookId(bookId) { 
        const result = await pool.query(
        'SELECT * FROM reading_progress WHERE book_id = $1 ORDER BY date_start',
        [bookId]
        );
        return result.rows;
    }

    async createReadingProgress(readingProgress) { 
        const { userEmail, bookId, currentPage, status, dateStart, dateEnd } = readingProgress;
        const result = await pool.query(
            `INSERT INTO reading_progress (user_email, book_id, current_page, status, date_start, date_end)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [userEmail, bookId, currentPage, status, dateStart, dateEnd]
        );
        return result.rows[0];
    }
    
    async deleteReadingProgress(id) { 
        await pool.query('DELETE FROM reading_progress WHERE id = $1', [id]);
        return true;
    }
    
    async updateReadingProgress(id, data) { 
        const currentReadingProgress = await this.getReadingProgress(id);
        if (!currentReadingProgress) return null;
        
        const { currentPage, status, dateStart, dateEnd } = data;
        const result = await pool.query(
            `UPDATE reading_progress SET current_page=$1, status=$2, date_start=$3, date_end=$4
            WHERE id=$5 RETURNING *`,
            [currentPage, status, dateStart, dateEnd, id]
        );
        return result.rows[0] || null;
    }

}