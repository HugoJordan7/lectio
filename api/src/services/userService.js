import bcrypt from 'bcrypt';

export default class userService {

  constructor(userDAO) { 
    this.userDAO = userDAO; 
  }

  async getUser(email) { 
    return this.userDAO.getUser(email); 
  }

  async createUser(user) {
    const { name, email, password } = user;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      throw new Error('Formato de e-mail inválido ou não fornecido.');
    }

    const userExists = await this.userDAO.getUser(email);
    if (userExists) {
      throw new Error('Este e-mail já está cadastrado no sistema.');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const secureUser = {
      name,
      email,
      password: hashedPassword
    };

    return this.userDAO.createUser(secureUser);
  }

  async deleteUser(email) { 
    return this.userDAO.deleteUser(email); 
  }

  async updateUser(email, data) { 
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return this.userDAO.updateUser(email, data); 
  }
}