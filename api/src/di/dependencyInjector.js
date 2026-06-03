import UserDAOPostgres from '../dao/postgre/userDAOPostgreSQL.js';
import UserService from '../services/userService.js';
import UserController from '../controllers/userController.js';
import BookDAOPostgreSQL from '../dao/postgre/bookDAOPostgreSQL.js';
import BookService from '../services/bookService.js';
import BookController from '../controllers/bookController.js';

const userDAO = new UserDAOPostgres();
const userService = new UserService(userDAO);
const userController = new UserController(userService);

const bookDAO = new BookDAOPostgreSQL();
const bookService = new BookService(bookDAO, userDAO);
const bookController = new BookController(bookService);

export { userController, bookController };