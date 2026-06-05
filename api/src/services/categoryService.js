const HEX_COLOR_REGEX = /^#[0-9A-Fa-f]{6}$/;

export default class categoryService {

    constructor(categoryDAO, bookDAO, userDAO) {
        this.categoryDAO = categoryDAO;
        this.bookDAO = bookDAO;
        this.userDAO = userDAO;
    }

    async getCategory(id, userEmail) {
        if (!id) throw new Error('O ID da categoria é obrigatório.');
        if (!userEmail) throw new Error('O email do usuário é obrigatório.');

        const category = await this.categoryDAO.getCategory(id, userEmail);
        if (!category) throw new Error('Categoria não encontrada.');
        return category;
    }

    async listCategories(userEmail) {
        if (!userEmail) throw new Error('O email do usuário é obrigatório.');
        return this.categoryDAO.listCategories(userEmail);
    }

    async createCategory(data) {
        const { name, color, userEmail } = data;

        if (!name || !name.trim())
        throw new Error('O nome da categoria é obrigatório.');

        if (!color || !HEX_COLOR_REGEX.test(color))
        throw new Error('A cor deve estar no formato hexadecimal válido (ex: #FF5733).');

        if (!userEmail) throw new Error('O email do usuário é obrigatório.');

        const userExists = await this.userDAO.getUser(userEmail);
        if (!userExists) throw new Error('Usuário não encontrado.');

        const duplicate = await this.categoryDAO.findByName(name.trim(), userEmail);
        if (duplicate) throw new Error(`Você já possui uma categoria com o nome "${name.trim()}".`);

        return this.categoryDAO.createCategory({ name: name.trim(), color, userEmail });
    }

    async deleteCategory(id, userEmail) {
        if (!id) throw new Error('O ID da categoria é obrigatório.');
        if (!userEmail) throw new Error('O email do usuário é obrigatório.');

        const category = await this.categoryDAO.getCategory(id, userEmail);
        if (!category) throw new Error('Categoria não encontrada ou sem permissão para excluí-la.');

        return this.categoryDAO.deleteCategory(id, userEmail);
    }

    async updateCategory(id, data, userEmail) {
        if (!id) throw new Error('O ID da categoria é obrigatório.');
        if (!userEmail) throw new Error('O email do usuário é obrigatório.');

        const { name, color } = data;

        if (!name || !name.trim())
        throw new Error('O nome da categoria é obrigatório.');

        if (!color || !HEX_COLOR_REGEX.test(color))
        throw new Error('A cor deve estar no formato hexadecimal válido (ex: #FF5733).');

        const category = await this.categoryDAO.getCategory(id, userEmail);
        if (!category) throw new Error('Categoria não encontrada ou sem permissão para editá-la.');

        const duplicate = await this.categoryDAO.findByName(name.trim(), userEmail);
        if (duplicate && duplicate.id !== id)
        throw new Error(`Você já possui outra categoria com o nome "${name.trim()}".`);

        return this.categoryDAO.updateCategory(id, { name: name.trim(), color }, userEmail);
    }

    async addCategoryToBook(bookId, categoryId, userEmail) {
        if (!bookId || !categoryId) throw new Error('O ID do livro e o ID da categoria são obrigatórios.');
        if (!userEmail) throw new Error('O email do usuário é obrigatório.');

        const book = await this.bookDAO.getBook(bookId);
        if (!book) throw new Error('Livro não encontrado.');

        if (book.user_email !== userEmail)
        throw new Error('Você não tem permissão para modificar as categorias deste livro.');

        const category = await this.categoryDAO.getCategory(categoryId, userEmail);
        if (!category) throw new Error('Categoria não encontrada ou sem permissão para utilizá-la.');

        const alreadyLinked = await this.categoryDAO.categoryExistsInBook(bookId, categoryId);
        if (alreadyLinked) throw new Error('Esta categoria já está associada a este livro.');

        return this.categoryDAO.addCategoryToBook(bookId, categoryId);
    }

    async removeCategoryFromBook(bookId, categoryId, userEmail) {
        if (!bookId || !categoryId) throw new Error('O ID do livro e o ID da categoria são obrigatórios.');
        if (!userEmail) throw new Error('O email do usuário é obrigatório.');

        const book = await this.bookDAO.getBook(bookId);
        if (!book) throw new Error('Livro não encontrado.');

        if (book.user_email !== userEmail)
        throw new Error('Você não tem permissão para modificar as categorias deste livro.');

        const linked = await this.categoryDAO.categoryExistsInBook(bookId, categoryId);
        if (!linked) throw new Error('Esta categoria não está associada a este livro.');

        return this.categoryDAO.removeCategoryFromBook(bookId, categoryId);
    }

    async listCategoriesByBook(bookId, userEmail) {
        if (!bookId) throw new Error('O ID do livro é obrigatório.');
        if (!userEmail) throw new Error('O email do usuário é obrigatório.');

        const book = await this.bookDAO.getBook(bookId);
        if (!book) throw new Error('Livro não encontrado.');

        if (book.user_email !== userEmail)
        throw new Error('Você não tem permissão para ver as categorias deste livro.');

        return this.categoryDAO.listCategoriesByBook(bookId, userEmail);
    }
}