import { api } from '../api.js';

const HEX = /^#[0-9A-Fa-f]{6}$/;

export const categoryService = {
    getCategories: (email) => api.getCategories(email),
    getCategoriesByBook: (bookId, email) => api.getCategoriesByBook(bookId, email),

    async create({ name, color, userEmail }) {
        if (!name?.trim()) throw new Error('Nome é obrigatório');
        if (!HEX.test(color)) throw new Error('Cor inválida — use o seletor de cor');
        return api.createCategory({ name: name.trim(), color, userEmail });
    },

    async update(id, { name, color, userEmail }) {
        if (!name?.trim())    throw new Error('Nome é obrigatório');
        if (!HEX.test(color)) throw new Error('Cor inválida — use o seletor de cor');
        return api.updateCategory(id, { name: name.trim(), color, userEmail });
    },

    delete: (id, email) => api.deleteCategory(id, email),
    link: (bookId, catId, email) => api.linkCategory(bookId, catId, email),
    unlink: (bookId, catId, email) => api.unlinkCategory(bookId, catId, email),
};