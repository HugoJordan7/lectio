import categoryDAO from '../categoryDAO.js';
import db from '../../db/database.js';
import { randomUUID } from 'crypto';

export default class categoryDAOSQLite extends categoryDAO {

    async getCategory(id, userEmail) {
        const result = db.prepare('SELECT * FROM categories WHERE id = ? AND user_email = ?');
        return result.get(id, userEmail) || null;
    }

    async listCategories(userEmail) {
        const result = db.prepare('SELECT * FROM categories WHERE user_email = ? ORDER BY name');
        return result.all(userEmail);
    }

    async findByName(name, userEmail) {
        const result = db.prepare('SELECT * FROM categories WHERE LOWER(name) = LOWER(?) AND user_email = ?');
        return result.get(name, userEmail) || null;
    }

    async createCategory(category) {
        const { name, color, userEmail } = category;
        const id = randomUUID();
        const result = db.prepare('INSERT INTO categories (id, name, color, user_email) VALUES (?, ?, ?, ?) RETURNING *');
        return result.get(id, name, color, userEmail);
    }

    async deleteCategory(id, userEmail) {
        db.prepare('DELETE FROM categories WHERE id = ? AND user_email = ?').run(id, userEmail);
        return true;
    }

    async updateCategory(id, data, userEmail) {
        const { name, color } = data;
        const result = db.prepare('UPDATE categories SET name = ?, color = ? WHERE id = ? AND user_email = ? RETURNING *');
        return result.get(name, color, id, userEmail) || null;
    }

    async addCategoryToBook(bookId, categoryId) {
        const result = db.prepare('INSERT INTO books_categories (book_id, category_id) VALUES (?, ?) RETURNING *');
        return result.get(bookId, categoryId);
    }

    async removeCategoryFromBook(bookId, categoryId) {
        db.prepare('DELETE FROM books_categories WHERE book_id = ? AND category_id = ?').run(bookId, categoryId);
        return true;
    }

    async listCategoriesByBook(bookId, userEmail) {
        const result = db.prepare(
            `SELECT c.* FROM categories c
            INNER JOIN books_categories bc ON c.id = bc.category_id
            WHERE bc.book_id = ? AND c.user_email = ?
            ORDER BY c.name`
        );
        return result.all(bookId, userEmail);
    }

    async categoryExistsInBook(bookId, categoryId) {
        const result = db.prepare('SELECT 1 FROM books_categories WHERE book_id = ? AND category_id = ?');
        return !!result.get(bookId, categoryId);
    }
}