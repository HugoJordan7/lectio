export default class readingProgressController {
    
    constructor(readingProgressService) {
        this.readingProgressService = readingProgressService;
    }

    async getReadingProgress(req, res, next) {
        try {
            const { id } = req.params;
            const readingProgress = await this.readingProgressService.getReadingProgress(id);
            if (!readingProgress) return res.status(404).json({ error: "Progresso de leitura não encontrado." });
            return res.status(200).json(readingProgress);
        } catch (error) {
            next(error);
        }
    }

    async getAllReadingProgresssByUserEmail(req, res, next) {
        try {
            const { userEmail } = req.params;
            const readingProgressList = await this.readingProgressService.getAllReadingProgresssByUserEmail(userEmail);
            return res.status(200).json(readingProgressList);
        } catch (error) {
            next(error);
        }
    }

    async getAllReadingProgressByBookId(req, res, next) {
        try {
            const { bookId } = req.params;
            const readingProgressList = await this.readingProgressService.getAllReadingProgressByBookId(bookId);
            return res.status(200).json(readingProgressList);
        } catch (error) {
            next(error);
        }
    }

    async createReadingProgress(req, res, next) {
        try {
            const readingProgressData = req.body;
            const newReadingProgress = await this.readingProgressService.createReadingProgress(readingProgressData);
            return res.status(201).json(newReadingProgress);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async deleteReadingProgress(req, res, next) {
        try {
            const { id } = req.params;
            await this.readingProgressService.deleteReadingProgress(id);
            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    async updateReadingProgress(req, res, next) {
        try {
            const { id } = req.params;
            const updatedReadingProgress = await this.readingProgressService.updateReadingProgress(id, req.body);
            if (!updatedReadingProgress) return res.status(404).json({ error: "Progresso de leitura não encontrado para atualização." });
            return res.status(200).json(updatedReadingProgress);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

}