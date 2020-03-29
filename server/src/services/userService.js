import db from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserService {
  static async addManager(newManager) {
    try {
      return await db.User.create(newManager);
    } catch (error) {
      return error.message;
    }
  }
  static async getManagers() {
    try {
      return await db.User.findAll({ where: { role: "manager" } });
    } catch (error) {
      return error.message;
    }
  }
  static async removeManager(id) {
    try {
      const manager = await this.findUser(id);
      manager.destroy();
      return manager;
    } catch (error) {
      return error.message;
    }
  }

  static async addUser(newUser) {
    try {
      console.log(newUser);
      return await db.User.create(newUser);
    } catch (error) {
      return error.message;
    }
  }

  static async findByCredentials(email, password) {
    try {
      const user = await db.User.findOne({ where: { email } });
      if (!user) {
        throw new Error("Invalid email credentials");
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      console.log(isPasswordMatch);
      if (!isPasswordMatch) {
        throw new Error("Invalid login credentials");
      }
      return user;
    } catch (error) {
      return error.message;
    }
  }

  static async findUser(id) {
    try {
      return await db.User.findByPk(id);
    } catch (error) {
      return error.message;
    }
  }

  static async generateAuthToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_KEY, { expiresIn: "1h" });
  }

  static async updateUserInfo(userInfo, userId) {
    try {
      return await db.User.update(
        {
          firstName: userInfo.firstname,
          lastName: userInfo.lastname,
          middleName: userInfo.middlename
        },
        {
          where: {
            id: userId
          }
        }
      );
    } catch (error) {
      return error.message;
    }
  }
}

export default UserService;
