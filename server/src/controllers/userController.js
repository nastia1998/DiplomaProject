import userService from "../services/userService";

class userController {
  static async addUser(req, res) {
    const { email, password } = req.body;
    const user = req.body;
    if (!email || !password) {
      return res.json("Email and password are required");
    }
    try {
      const createdUser = await userService.addUser(user);
      createdUser.password = undefined;
      const userData = { user: createdUser };
      return res.status(201).send({ userData });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  static async findByCredentials(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }
    try {
      const user = await userService.findByCredentials(email, password);
      user.firstName = undefined;
      user.lastName = undefined;
      user.middleName = undefined;
      user.photo = undefined;
      const token = await userService.generateAuthToken(user.id);
      const userData = { user, token };
      return res.send(userData);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  static async fetchUserProfile(req, res) {
    try {
      const { user } = req;
      user.password = undefined;
      return res.status(200).send(user);
    } catch (error) {
      return res.send(error.message);
    }
  }

  static async updateUserInfo(req, res) {
    const userInfo = req.body;
    const { user_id } = req.params;
    try {
      const count = await userService.updateUserInfo(userInfo, user_id);
      const updatedUser = await userService.findUser(user_id);
      updatedUser.password = undefined;
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
}

export default userController;
