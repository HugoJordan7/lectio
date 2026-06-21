import readingProgressDAO from "../readingProgressDAO.js";
import db from '../../db/database.js';
import { randomUUID } from 'crypto';

export default class readingProgressDAOSQLite extends readingProgressDAO {

    async getReadingProgress(id) {
        const result = db.prepare(
            'SELECT id, user_email, book_id, current_page, status, date_start, date_end FROM reading_progress WHERE id = ?'
        );
        return result.get(id) || null;
    }

    async getAllReadingProgresssByUserEmail(userEmail) {
        const result = db.prepare('SELECT * FROM reading_progress WHERE user_email = ? ORDER BY date_start');
        return result.all(userEmail);
    }

    async getAllReadingProgressByBookId(bookId) {
        const result = db.prepare('SELECT * FROM reading_progress WHERE book_id = ? ORDER BY date_start');
        return result.all(bookId);
    }

    async createReadingProgress(readingProgress) {
        const { userEmail, bookId, currentPage, status, dateStart, dateEnd } = readingProgress;
        const id = randomUUID();
        const result = db.prepare(
            `INSERT INTO reading_progress (id, user_email, book_id, current_page, status, date_start, date_end)
            VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING *`
        );
        return result.get(id, userEmail, bookId, currentPage, status, dateStart, dateEnd);
    }

    async deleteReadingProgress(id) {
        db.prepare('DELETE FROM reading_progress WHERE id = ?').run(id);
        return true;
    }

    async updateReadingProgress(id, data) {
        const currentReadingProgress = await this.getReadingProgress(id);
        if (!currentReadingProgress) return null;

        const { currentPage, status, dateStart, dateEnd } = data;
        const result = db.prepare(
            `UPDATE reading_progress SET current_page=?, status=?, date_start=?, date_end=?
            WHERE id=? RETURNING *`
        );
        return result.get(currentPage, status, dateStart, dateEnd, id) || null;
    }
}