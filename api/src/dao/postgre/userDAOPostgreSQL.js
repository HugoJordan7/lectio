import userDAO from '../userDAO.js';
import pool from '../../db/database.js';

export default class userDAOPostgreSQL extends userDAO {
  
  async getUser(email) {
    const result = await pool.query(
      'SELECT email, name FROM users WHERE email = $1', 
      [email]
    );
    return result.rows[0] || null;
  }

  async createUser(user) {
    const { name, email, password } = user;
    const result = await pool.query(
      'INSERT INTO users (email, name, password) VALUES ($1, $2, $3) RETURNING email, name',
      [email, name, password]
    );
    return result.rows[0];
  }

  async deleteUser(email) {
    await pool.query('DELETE FROM users WHERE email = $1', [email]);
    return true;
  }

  async updateUser(email, data) {
    const { name, password } = data;
    
    const result = await pool.query(
      'UPDATE users SET name = $1, password = $2 WHERE email = $3 RETURNING email, name',
      [name, password, email]
    );
    return result.rows[0] || null;
  }
}