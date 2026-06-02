import UserDAOPostgres from '../dao/postgre/userDAOPostgreSQL.js';
import UserService from '../services/userService.js';
import UserController from '../controllers/userController.js';

const userDAO = new UserDAOPostgres();
const userService = new UserService(userDAO);
const userController = new UserController(userService);

export { userController };