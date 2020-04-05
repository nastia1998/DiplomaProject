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
      console.log(error);
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

  // --------------------------------------- Managers Logic -------------------------------------------------
  static async addManager(req, res) {
    const { email } = req.body;
    const manager = req.body;
    manager.role = "manager";
    manager.password = "Initial1";
    if (!email) {
      return res.json("Email is required");
    }
    try {
      const createdManager = await userService.addManager(manager);
      createdManager.password = undefined;
      const managerData = { manager: createdManager };
      return res.status(201).send({ managerData });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
  static async getManagers(req, res) {
    try {
      const managers = await userService.getManagers();
      return res.status(200).send(managers);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
  static async removeManager(req, res) {
    try {
      const { manager_id } = req.params;
      const remManager = await userService.removeManager(manager_id);
      return res.send(remManager);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  // --------------------------------------- Students Logic -------------------------------------------------
  static async getStudents(req, res) {
    try {
      const students = await userService.getStudents();
      return res.status(200).send(students);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  static async getPotentialMentors(req, res) {
    try {
      const potentialMentors = await userService.getPotentialMentors();
      return res.status(200).send(potentialMentors);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  static async addUserSkill(req, res) {
    try {
      const { user_id, skill_id } = req.body;
      if (!user_id || !skill_id) {
        return res.json("IDs of user and skill are required!");
      }
      const newUserSkill = req.body;
      const createdUserSkill = await userService.addUserSkill(newUserSkill);
      return res.status(201).send({ createdUserSkill });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  static async approveUserSkill(req, res) {
    try {
      const { userskillid } = req.params;
      const count = await userService.approveUserSkill(userskillid);
      return res.status(200).send(count);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
}

export default userController;
