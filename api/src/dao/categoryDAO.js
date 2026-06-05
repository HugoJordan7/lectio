export default class categoryDAO {
  async getCategory(id, userEmail) { throw new Error('Not implemented: categoryDAO.getCategory'); }
  async listCategories(userEmail) { throw new Error('Not implemented: categoryDAO.listCategories'); }
  async findByName(name, userEmail) { throw new Error('Not implemented: categoryDAO.findByName'); }
  async createCategory(category) { throw new Error('Not implemented: categoryDAO.createCategory'); }
  async deleteCategory(id, userEmail) { throw new Error('Not implemented: categoryDAO.deleteCategory'); }
  async updateCategory(id, data, userEmail) { throw new Error('Not implemented: categoryDAO.updateCategory'); }
  async addCategoryToBook(bookId, categoryId) { throw new Error('Not implemented: categoryDAO.addCategoryToBook'); }
  async removeCategoryFromBook(bookId, categoryId) { throw new Error('Not implemented: categoryDAO.removeCategoryFromBook'); }
  async listCategoriesByBook(bookId, userEmail) { throw new Error('Not implemented: categoryDAO.listCategoriesByBook'); }
  async categoryExistsInBook(bookId, categoryId) { throw new Error('Not implemented: categoryDAO.categoryExistsInBook'); }
}