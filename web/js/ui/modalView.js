import { store } from '../store/store.js';

export function openBookModal(onSaveCallback) {
    const root = document.getElementById('modal-root');

    const categoryOptions = store.categories && store.categories.length > 0
        ? store.categories.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('')
        : '<option value="">Nenhuma categoria cadastrada</option>';

    root.innerHTML = `
        <div class="modal-bg">
            <div class="modal">
                <h2>Novo Livro</h2>

                <input id="title" placeholder="Título"><br><br>
                <input id="author" placeholder="Autor"><br><br>
                <input id="pages" placeholder="Páginas"><br><br>

                <label for="book-assessment-select" style="font-size: 14px; font-weight: bold; display: block; margin-bottom: 5px;">Nota / Avaliação:</label>
                <select id="book-assessment-select" style="width: 100%; padding: 8px; border-radius: 6px; margin-bottom: 15px;">
                    <option value="">-- Sem nota --</option>
                    <option value="5">⭐⭐⭐⭐⭐ (5)</option>
                    <option value="4">⭐⭐⭐⭐ (4)</option>
                    <option value="3">⭐⭐⭐ (3)</option>
                    <option value="2">⭐⭐ (2)</option>
                    <option value="1">⭐ (1)</option>
                    <option value="0">⭐ Sem Estrelas (0)</option>
                </select>

                <label for="book-category-select" style="font-size: 14px; font-weight: bold; display: block; margin-bottom: 5px;">Categoria:</label>
                <select id="book-category-select" style="width: 100%; padding: 8px; border-radius: 6px; margin-bottom: 20px;">
                    <option value="">-- Selecione uma categoria (Opcional) --</option>
                    ${categoryOptions}
                </select>

                <button id="save-book">Salvar</button>
                <button id="close-modal" style="background: #ccc; border: none; padding: 5px 10px; margin-left: 10px; cursor: pointer; border-radius: 6px;">Cancelar</button>
            </div>
        </div>
    `;

    document.getElementById('close-modal').addEventListener('click', () => {
        root.innerHTML = '';
    });

    document.getElementById('save-book').addEventListener('click', async () => {
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const totalPages = document.getElementById('pages').value;
        const assessment = document.getElementById('book-assessment-select').value;
        const categoryId = document.getElementById('book-category-select').value;

        if (!title || !author) {
            alert('Por favor, preencha o título e o autor.');
            return;
        }

        if (onSaveCallback) {
            await onSaveCallback({
                title,
                author,
                totalPages: totalPages ? parseInt(totalPages, 10) : null,
                assessment: assessment !== "" ? parseInt(assessment, 10) : null,
                userEmail: "user1@gmail.com"
            }, categoryId); 
        }
    });
}

export const modalView = {
    bindEvents: (onCreateBook) => {
        const fab = document.getElementById('fab');
        if (fab) {
            fab.addEventListener('click', () => {
                openBookModal(onCreateBook);
            });
        }
    },
    close: () => {
        const root = document.getElementById('modal-root');
        if (root) root.innerHTML = '';
    }
};