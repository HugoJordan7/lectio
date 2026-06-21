export default class categoryController {

    constructor(categoryService) {
        this.categoryService = categoryService;
    }

    async getCategory(req, res, next) {
        try {
            const { id } = req.params;
            const { userEmail } = req.query;
            const category = await this.categoryService.getCategory(id, userEmail);
            return res.status(200).json(category);
        } catch (error) {
            next(error);
        }
    }

    async listCategories(req, res, next) {
        try {
            const { userEmail } = req.params;
            const categories = await this.categoryService.listCategories(userEmail);
            return res.status(200).json(categories);
        } catch (error) {
            next(error);
        }
    }

    async createCategory(req, res, next) {
        try {
            const category = await this.categoryService.createCategory(req.body);
            return res.status(201).json(category);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async deleteCategory(req, res, next) {
        try {
            const { id } = req.params;
            const { userEmail } = req.body;
            await this.categoryService.deleteCategory(id, userEmail);
            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    async updateCategory(req, res, next) {
        try {
            const { id } = req.params;
            const { userEmail, ...data } = req.body;
            const updated = await this.categoryService.updateCategory(id, data, userEmail);
            return res.status(200).json(updated);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async addCategoryToBook(req, res, next) {
        try {
            const { bookId, categoryId } = req.params;
            const { userEmail } = req.body;
            const result = await this.categoryService.addCategoryToBook(bookId, categoryId, userEmail);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async removeCategoryFromBook(req, res, next) {
        try {
            const { bookId, categoryId } = req.params;
            const { userEmail } = req.body;
            await this.categoryService.removeCategoryFromBook(bookId, categoryId, userEmail);
            return res.status(204).send();
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async listCategoriesByBook(req, res, next) {
        try {
            const { bookId } = req.params;
            const { userEmail } = req.query;
            const categories = await this.categoryService.listCategoriesByBook(bookId, userEmail);
            return res.status(200).json(categories);
        } catch (error) {
            next(error);
        }
    }

}