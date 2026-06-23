import { store } from '../store/store.js';

export function renderCategories() {
    const aside = document.getElementById('categories-section');

    aside.innerHTML = `
        <h2>Categorias</h2>
        ${store.categories.map(cat => `
            <div class="category">
                <div class="color" style="background:${cat.color || '#ccc'}"></div>
                ${cat.name}
            </div>
        `).join('')}
        <button id="new-category">Nova Categoria</button>
    `;
}

export const categoryView = {
    render: renderCategories,
    bindAdd: (onCreateCategory) => {
        const btn = document.getElementById('new-category');
        if (btn) {
            btn.addEventListener('click', () => {
                const name = prompt('Nome da nova categoria:');
                if (!name) return;
                const color = prompt('Cor da categoria (ex: #ff0000 ou azul):', '#2c7efa');
                
                onCreateCategory({ name, color });
            });
        }
    }
};