import userDAO from '../userDAO.js';
import db from '../../db/database.js';

export default class userDAOSQLite extends userDAO {

    async getUser(email) {
        const result = db.prepare('SELECT email, name FROM users WHERE email = ?');
        return result.get(email) || null;
    }

    async getUsers() {
        const result = db.prepare('SELECT email, name FROM users');
        return result.all();
    }

    async getUserWithPassword(email) {
        const result = db.prepare('SELECT email, name, password FROM users WHERE email = ?');
        return result.get(email) || null;
    }

    async createUser(user) {
        const { name, email, password } = user;
        const result = db.prepare('INSERT INTO users (email, name, password) VALUES (?, ?, ?) RETURNING email, name');
        return result.get(email, name, password);
    }

    async deleteUser(email) {
        db.prepare('DELETE FROM users WHERE email = ?').run(email);
        return true;
    }

    async updateUser(email, data) {
        const { name, password } = data;
        const result = db.prepare('UPDATE users SET name = ?, password = ? WHERE email = ? RETURNING email, name');
        return result.get(name, password, email) || null;
    }

}