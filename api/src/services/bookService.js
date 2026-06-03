export default class bookService {
    
    constructor(bookDAO, userDAO) { 
        this.bookDAO = bookDAO; 
        this.userDAO = userDAO;
    }

    async getBook(id) { 
        if (!id) throw new Error("O ID do livro é obrigatório.");
        return this.bookDAO.getBook(id); 
    }

    async createBook(book) { 
        const { title, author, totalPages, assessment, userEmail } = book;

        if (!title || !author || !userEmail) {
            throw new Error("Título, autor e email do usuário são obrigatórios para cadastrar um livro.");
        }

        if (totalPages !== undefined && totalPages <= 0) {
            throw new Error("O total de páginas deve ser maior que zero.");
        }

        if (assessment !== undefined && (assessment < 0 || assessment > 5)) {
            throw new Error("A avaliação do livro deve ser uma nota entre 0 e 5.");
        }

        if (this.userDAO) {
            const userExists = await this.userDAO.getUser(userEmail);
            if (!userExists) {
                throw new Error("Não é possível vincular o livro. Usuário não encontrado no sistema.");
            }
        }

        return this.bookDAO.createBook(book); 
    }

    async getAllBooks(userEmail) { 
        if (!userEmail) throw new Error("O email do usuário é obrigatório para listar os livros.");
        return this.bookDAO.getAllBooks(userEmail); 
    }

    async deleteBook(id) { 
        if (!id) throw new Error("O ID do livro é obrigatório.");
        return this.bookDAO.deleteBook(id); 
    }

    async updateBook(id, data) { 
        if (!id) throw new Error("O ID do livro é obrigatório para atualização.");

        const { title, author } = data;

        if (title !== undefined && !title.trim()) {
            throw new Error("Título inválido.");
        }

        if (author !== undefined && !author.trim()) {
            throw new Error("Autor inválido.");
        }
        
        if (!data || Object.keys(data).length === 0) {
            throw new Error("Nenhum dado fornecido para atualização.");
        }

        if (data.totalPages !== undefined && (typeof data.totalPages !== 'number' || data.totalPages <= 0)) {
            throw new Error("O total de páginas deve ser um número maior que zero.");
        }

        if (data.assessment !== undefined && (typeof data.assessment !== 'number' || data.assessment < 0 || data.assessment > 5)) {
            throw new Error("A avaliação do livro deve ser um número entre 0 e 5.");
        }

        return this.bookDAO.updateBook(id, data); 
    }
}