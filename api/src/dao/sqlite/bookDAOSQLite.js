import bookDAO from '../bookDAO.js';
import db from '../../db/database.js';
import { randomUUID } from 'crypto';

export default class bookDAOSQLite extends bookDAO {

    async getBook(id) {
        const result = db.prepare('SELECT id, title, author, resume, total_pages, assessment, user_email FROM books WHERE id = ?');
        return result.get(id) || null;
    }

    async getAllBooks(userEmail) {
        const result = db.prepare('SELECT * FROM books WHERE user_email = ? ORDER BY title');
        return result.all(userEmail);
    }

    async createBook(book) {
        const { title, author, resume, totalPages, assessment, userEmail } = book;
        const id = randomUUID();
        const result = db.prepare(
            `INSERT INTO books (id, title, author, resume, total_pages, assessment, user_email)
            VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING *`
        );
        return result.get(id, title, author, resume, totalPages, assessment, userEmail);
    }

    async deleteBook(id) {
        db.prepare('DELETE FROM books WHERE id = ?').run(id);
        return true;
    }

    async updateBook(id, data) {
        const currentBook = await this.getBook(id);
        if (!currentBook) return null;

        const { title, author, resume, totalPages, assessment } = data;
        const result = db.prepare(
            `UPDATE books SET title=?, author=?, resume=?, total_pages=?, assessment=?
            WHERE id=? RETURNING *`
        );
        return result.get(title, author, resume, totalPages, assessment, id) || null;
    }
}