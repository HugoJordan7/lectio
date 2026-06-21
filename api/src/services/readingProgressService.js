export default class readingProgressService {

    constructor(readingProgressDAO, userDAO, bookDAO) { 
        this.readingProgressDAO = readingProgressDAO; 
        this.userDAO = userDAO;
        this.bookDAO = bookDAO;
    }
    
    async getReadingProgress(id) { 
        if (!id) throw new Error("O ID do progresso de leitura é obrigatório.");
        return this.readingProgressDAO.getReadingProgress(id); 
    }

    async getAllReadingProgresssByUserEmail(userEmail) { 
        if (!userEmail) throw new Error("O email do usuário é inválido.");
        return this.readingProgressDAO.getAllReadingProgresssByUserEmail(userEmail); 
    }

    async getAllReadingProgressByBookId(bookId) { 
        if (!bookId) throw new Error("O id do livro é obrigatório para listar os progressos de leitura.");
        return this.readingProgressDAO.getAllReadingProgressByBookId(bookId); 
    }

    async createReadingProgress(readingProgress) { 
        const { userEmail, bookId, currentPage, status, dateStart, dateEnd } = readingProgress;

        if (!status || !bookId || !userEmail) {
            throw new Error("Email do usuário, id do livro e estado da leitura são obrigatórios para cadastrar um progresso de leitura.");
        }

        if (this.userDAO) {
            const userExists = await this.userDAO.getUser(userEmail);
            if (!userExists) {
                throw new Error("Não é possível criar o progresso de leitura. Usuário não encontrado no sistema.");
            }
        }

        if (this.bookDAO) {
            const bookExists = await this.bookDAO.getBook(bookId);
            if (!bookExists) {
                throw new Error("Não é possível criar o progresso de leitura. Livro não encontrado no sistema.");
            }
        }

        return this.readingProgressDAO.createReadingProgress(readingProgress); 
    }
    
    async deleteReadingProgress(id) { 
        if (!id) throw new Error("O ID do livro é obrigatório.");
        return this.readingProgressDAO.deleteReadingProgress(id); 
    }
    
    async updateReadingProgress(id, data) { 
        if (!id) throw new Error("O ID do progresso de leitura é obrigatório para atualização.");

        const { current_page, status, date_start, date_end } = data;

        if (status !== undefined && !status.trim()) {
            throw new Error("Status de leitura inválido.");
        }

        return this.readingProgressDAO.updateReadingProgress(id, data); 
    }

}