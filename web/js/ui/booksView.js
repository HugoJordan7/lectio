import { store } from '../store/store.js';

export function renderBooks(bookCategories, onRemoveBook) {
    const section = document.getElementById('books-section');

    if (!section) return;

    // Usando a store global de forma segura
    if (!store.books || store.books.length === 0) {
        section.innerHTML = `<p>Nenhum livro cadastrado.</p>`;
        return;
    }

    section.innerHTML = store.books.map(book => {
        // Coleta as categorias mapeadas para o id deste livro específico
        const list = bookCategories?.[book.id] || [];
        
        const categoriesHtml = list.length > 0
            ? list.map(cat => `
                <span class="book-category-tag" style="background-color: ${cat.color || '#4f46e5'};">
                    ${cat.name}
                </span>
              `).join('')
            : '<span class="no-category-tag">Sem categoria</span>';

        return `
            <div class="book-card">
                <div class="book-menu" data-id="${book.id}">⋮</div>
                <h2>${book.title}</h2>
                
                <div class="book-categories-container">
                    ${categoriesHtml}
                </div>

                <p><strong>Autor:</strong> ${book.author}</p>
                <p><strong>Páginas:</strong> ${book.total_pages ?? '-'}</p>
                <p><strong>Nota:</strong> ${book.assessment ?? '-'}</p>
            </div>
        `;
    }).join('');

    section.querySelectorAll('.book-menu').forEach(btn => {
        btn.onclick = async () => {
            const id = btn.dataset.id;
            if (confirm('Excluir livro?')) {
                if (onRemoveBook) await onRemoveBook(id);
            }
        };
    });
}

// CORREÇÃO AQUI: Alinhando os parâmetros enviados pelo main.js
export const bookView = {
    render: (books, progress, bookCategories, removeBookCallback) => {
        // Ignoramos books e progress pois a função já consome a store global,
        // mas repassamos bookCategories e o callback corretamente.
        renderBooks(bookCategories, removeBookCallback);
    }
};