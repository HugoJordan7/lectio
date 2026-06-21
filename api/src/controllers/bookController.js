export default class bookController {
    
    constructor(bookService) {
        this.bookService = bookService;
    }

    async getBook(req, res, next) {
        try {
            const { id } = req.params;
            const book = await this.bookService.getBook(id);
            if (!book) return res.status(404).json({ error: "Livro não encontrado." });
            return res.status(200).json(book);
        } catch (error) {
            next(error);
        }
    }

    async createBook(req, res, next) {
        try {
            const bookData = req.body;
            const newBook = await this.bookService.createBook(bookData);
            return res.status(201).json(newBook);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async getAllBooks(req, res, next) {
        try {
            const { userEmail } = req.params;
            const books = await this.bookService.getAllBooks(userEmail);
            return res.status(200).json(books);
        } catch (error) {
            next(error);
        }
    }

    async updateBook(req, res, next) {
        try {
            const { id } = req.params;
            const updatedBook = await this.bookService.updateBook(id, req.body);
            if (!updatedBook) return res.status(404).json({ error: "Livro não encontrado para atualização." });
            return res.status(200).json(updatedBook);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async deleteBook(req, res, next) {
        try {
            const { id } = req.params;
            await this.bookService.deleteBook(id);
            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}