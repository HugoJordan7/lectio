
//export const API_URL = 'https://lectio-9bc3.onrender.com';
export const API_URL = 'http://localhost:3000';

const USER_EMAIL = "user1@gmail.com";

async function request(path, options = {}) {
    const res = await fetch(`${API_URL}${path}`, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
    });

    if (!res.ok) {
        let msg = `Erro ${res.status}`;
        try {
        const body = await res.json();
        if (body?.error) msg = body.error;
        } catch (_) {}
        throw new Error(msg);
    }

    if (res.status === 204) return null;
    return res.json();
}

export const api = {
    // ---- Books ----
    getBooks: (email) => request(`/books/user/${encodeURIComponent(USER_EMAIL)}`),
    createBook: (data) => request('/books', { method: 'POST', body: JSON.stringify(data) }),
    updateBook: (id, data) => request(`/books/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteBook: (id) => request(`/books/${id}`, { method: 'DELETE' }),

    // ---- Categories ----
    getCategories: (email) => request(`/categories/user/${encodeURIComponent(USER_EMAIL)}`),
    getCategoriesByBook: (bookId, email) => request(`/categories/book/${bookId}?userEmail=${encodeURIComponent(USER_EMAIL)}`),
    createCategory: (data) => request('/categories', { method: 'POST', body: JSON.stringify(data) }),
    updateCategory: (id, data) => request(`/categories/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteCategory: (id, email) => request(`/categories/${id}`, { method: 'DELETE', body: JSON.stringify({ userEmail: USER_EMAIL }) }),
    linkCategory: (bId, cId, email) => request(`/categories/book/${bId}/${cId}`, { method: 'POST',   body: JSON.stringify({ userEmail: USER_EMAIL }) }),
    unlinkCategory: (bId, cId, email) => request(`/categories/book/${bId}/${cId}`, { method: 'DELETE', body: JSON.stringify({ userEmail: USER_EMAIL }) }),

    // ---- Reading Progress ----
    getProgress: (bookId) => request(`/readingProgress/books/${bookId}`),
    getAllProgress: (email) => request(`/readingProgress/users/${encodeURIComponent(USER_EMAIL)}`),
    createProgress: (data) => request('/readingProgress', { method: 'POST', body: JSON.stringify(data) }),
    updateProgress: (id, data) => request(`/readingProgress/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteProgress: (id) => request(`/readingProgress/${id}`, { method: 'DELETE' }),
};