import UserDAOPostgres from '../dao/postgre/userDAOPostgreSQL.js';
import UserService from '../services/userService.js';
import UserController from '../controllers/userController.js';
import BookDAOPostgreSQL from '../dao/postgre/bookDAOPostgreSQL.js';
import BookService from '../services/bookService.js';
import BookController from '../controllers/bookController.js';
import ReadingProgressDAOPostgreSQL from '../dao/postgre/readingProgressDAOPostgreSQL.js';
import ReadingProgressService from '../services/readingProgressService.js';
import ReadingProgressController from '../controllers/readingProgressController.js';

const userDAO = new UserDAOPostgres();
const userService = new UserService(userDAO);
const userController = new UserController(userService);

const bookDAO = new BookDAOPostgreSQL();
const bookService = new BookService(bookDAO, userDAO);
const bookController = new BookController(bookService);

const readingProgressDAO = new ReadingProgressDAOPostgreSQL();
const readingProgressService = new ReadingProgressService(readingProgressDAO, userDAO, bookDAO);
const readingProgressController = new ReadingProgressController(readingProgressService);

export { userController, bookController, readingProgressController };