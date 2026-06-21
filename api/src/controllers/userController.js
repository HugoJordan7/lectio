export default class userController {
  constructor(userService) { this.userService = userService; }

  async getUser(req, res, next) {
    try {
      const user = await this.userService.getUser(req.params.id);
      if (!user) { const e = new Error('Usuário não encontrado'); e.status = 404; return next(e); }
      res.json(user);
    } catch (err) { next(err); }
  }

  async createUser(req, res, next) {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (err) { next(err); }
  }

  async updateUser(req, res, next) {
    try {
      const user = await this.userService.updateUser(req.params.id, req.body);
      if (!user) { const e = new Error('Usuário não encontrado'); e.status = 404; return next(e); }
      res.json(user);
    } catch (err) { next(err); }
  }

  async deleteUser(req, res, next) {
    try {
      await this.userService.deleteUser(req.params.id);
      res.status(204).send();
    } catch (err) { next(err); }
  }
}
