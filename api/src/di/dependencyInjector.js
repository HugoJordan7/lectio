import UserDAOSQLite from '../dao/sqlite/userDAOSQLite.js';
import UserService from '../services/userService.js';
import UserController from '../controllers/userController.js';
import BookDAOSQLite from '../dao/sqlite/bookDAOSQLite.js';
import BookService from '../services/bookService.js';
import BookController from '../controllers/bookController.js';
import ReadingProgressDAOSQLite from '../dao/sqlite/readingProgressDAOSQLite.js';
import ReadingProgressService from '../services/readingProgressService.js';
import ReadingProgressController from '../controllers/readingProgressController.js';
import CategoryDAOSQLite from '../dao/sqlite/categoryDAOSQLite.js';
import CategoryService from '../services/categoryService.js';
import CategoryController from '../controllers/categoryController.js';

const userDAO = new UserDAOSQLite();
const userService = new UserService(userDAO);
const userController = new UserController(userService);

const bookDAO = new BookDAOSQLite();
const bookService = new BookService(bookDAO, userDAO);
const bookController = new BookController(bookService);

const readingProgressDAO = new ReadingProgressDAOSQLite();
const readingProgressService = new ReadingProgressService(readingProgressDAO, userDAO, bookDAO);
const readingProgressController = new ReadingProgressController(readingProgressService);

const categoryDAO = new CategoryDAOSQLite();
const categoryService = new CategoryService(categoryDAO, bookDAO, userDAO);
const categoryController = new CategoryController(categoryService);

export { userController, bookController, readingProgressController, categoryController };