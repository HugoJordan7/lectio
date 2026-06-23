import { api } from '../api.js';

export const readingProgressService = {
    getProgress: (bookId) => api.getProgress(bookId),
    getAllProgress: (email) => api.getAllProgress(email),

    async create({ userEmail, bookId, currentPage, status, dateStart, dateEnd }) {
        if (!bookId) throw new Error('Selecione um livro');
        if (!status) throw new Error('Status é obrigatório');
        return api.createProgress({
            userEmail, bookId,
            currentPage: Number(currentPage) || 0,
            status,
            dateStart: dateStart || null,
            dateEnd:   dateEnd   || null,
        });
    },

    async update(id, { currentPage, status, dateStart, dateEnd }) {
        if (!status?.trim()) throw new Error('Status é obrigatório');
        return api.updateProgress(id, {
            currentPage: Number(currentPage) || 0,
            status,
            dateStart: dateStart || null,
            dateEnd:   dateEnd   || null,
        });
    },

    delete: (id) => api.deleteProgress(id),
};