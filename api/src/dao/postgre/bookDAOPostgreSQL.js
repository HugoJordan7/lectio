import bookDAO from '../bookDAO.js';
import pool from '../../db/database.js';

export default class bookDAOPostgreSQL extends bookDAO {
  
  async getBook(id) {
    const result = await pool.query(
      'SELECT id, title, author, resume, total_pages, assessment, user_email FROM books WHERE id = $1', 
      [id]
    );
    return result.rows[0] || null;
  }

  async getAllBooks(userEmail) {
    const result = await pool.query(
      'SELECT * FROM books WHERE user_email = $1 ORDER BY title',
      [userEmail]
    );
    return result.rows;
  }

  async createBook(book) {
    const { title, author, resume, totalPages, assessment, userEmail } = book;
    const result = await pool.query(
      `INSERT INTO books (title, author, resume, total_pages, assessment, user_email)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [title, author, resume, totalPages, assessment, userEmail]
    );
    return result.rows[0];
  }

  async deleteBook(id) {
    await pool.query('DELETE FROM books WHERE id = $1', [id]);
    return true;
  }

  async updateBook(id, data) {
    const currentBook = await this.getBook(id);
    if (!currentBook) return null;
    
    const { title, author, resume, totalPages, assessment } = data;
    const result = await pool.query(
      `UPDATE books SET title=$1, author=$2, resume=$3, total_pages=$4, assessment=$5
       WHERE id=$6 RETURNING *`,
      [title, author, resume, totalPages, assessment, id]
    );
    return result.rows[0] || null;
  }
}