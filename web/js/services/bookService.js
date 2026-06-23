import { api } from '../api.js';

export const bookService = {

    getBooks: (email) => api.getBooks(email),

    async create({ title, author, resume, totalPages, assessment, userEmail }) {
        if (!title?.trim()) throw new Error('Título é obrigatório');
        if (!author?.trim()) throw new Error('Autor é obrigatório');

        const pgs = totalPages !== '' && totalPages != null ? Number(totalPages) : null;
        const nota = assessment !== '' && assessment != null ? Number(assessment) : null;

        if (pgs  !== null && pgs  <= 0) throw new Error('Nº de páginas deve ser maior que zero');
        if (nota !== null && (nota < 0 || nota > 5)) throw new Error('Avaliação deve ser entre 0 e 5');
        return api.createBook({
            title: title.trim(), author: author.trim(),
            resume: resume?.trim() || null,
            totalPages: pgs, assessment: nota, userEmail,
        });
    },

    async update(id, { title, author, resume, totalPages, assessment }) {
        if (!title?.trim()) throw new Error('Título é obrigatório');
        if (!author?.trim()) throw new Error('Autor é obrigatório');
        return api.updateBook(id, {
            title: title.trim(), author: author.trim(),
            resume: resume?.trim() || null,
            totalPages: totalPages !== '' && totalPages != null ? Number(totalPages) : null,
            assessment: assessment !== '' && assessment != null ? Number(assessment) : null,
        });
    },

    deleteBook: (id) => api.deleteBook(id),
};