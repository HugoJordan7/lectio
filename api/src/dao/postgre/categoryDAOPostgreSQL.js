import categoryDAO from '../categoryDAO.js';
import pool from '../../db/database.js';

export default class categoryDAOPostgreSQL extends categoryDAO {

    async getCategory(id, userEmail) {
        const result = await pool.query(
        'SELECT * FROM categories WHERE id = $1 AND user_email = $2',
        [id, userEmail]
        );
        return result.rows[0] || null;
    }

    async listCategories(userEmail) {
        const result = await pool.query(
        'SELECT * FROM categories WHERE user_email = $1 ORDER BY name',
        [userEmail]
        );
        return result.rows;
    }

    async findByName(name, userEmail) {
        const result = await pool.query(
        'SELECT * FROM categories WHERE LOWER(name) = LOWER($1) AND user_email = $2',
        [name, userEmail]
        );
        return result.rows[0] || null;
    }

    async createCategory(category) {
        const { name, color, userEmail } = category;
        const result = await pool.query(
        'INSERT INTO categories (name, color, user_email) VALUES ($1, $2, $3) RETURNING *',
        [name, color, userEmail]
        );
        return result.rows[0];
    }

    async deleteCategory(id, userEmail) {
        await pool.query(
        'DELETE FROM categories WHERE id = $1 AND user_email = $2',
        [id, userEmail]
        );
        return true;
    }

    async updateCategory(id, data, userEmail) {
        const { name, color } = data;
        const result = await pool.query(
        `UPDATE categories SET name = $1, color = $2
        WHERE id = $3 AND user_email = $4 RETURNING *`,
        [name, color, id, userEmail]
        );
        return result.rows[0] || null;
    }

    async addCategoryToBook(bookId, categoryId) {
        const result = await pool.query(
        'INSERT INTO books_categories (book_id, category_id) VALUES ($1, $2) RETURNING *',
        [bookId, categoryId]
        );
        return result.rows[0];
    }

    async removeCategoryFromBook(bookId, categoryId) {
        await pool.query(
        'DELETE FROM books_categories WHERE book_id = $1 AND category_id = $2',
        [bookId, categoryId]
        );
        return true;
    }

    async listCategoriesByBook(bookId, userEmail) {
        const result = await pool.query(
        `SELECT c.* FROM categories c
        INNER JOIN books_categories bc ON c.id = bc.category_id
        WHERE bc.book_id = $1 AND c.user_email = $2
        ORDER BY c.name`,
        [bookId, userEmail]
        );
        return result.rows;
    }

    async categoryExistsInBook(bookId, categoryId) {
        const result = await pool.query(
        'SELECT 1 FROM books_categories WHERE book_id = $1 AND category_id = $2',
        [bookId, categoryId]
        );
        return result.rows.length > 0;
    }
}