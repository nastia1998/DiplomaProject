import db from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserService {
  static async addUser(newUser) {
    try {
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
      if (!isPasswordMatch) {
        throw new Error("Invalid login credentials");
      }
      return user;
    } catch (error) {
      throw error;
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
      console.log(userInfo);
      console.log(userId);
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
