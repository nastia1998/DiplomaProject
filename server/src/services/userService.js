import db from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Sequelize from "sequelize";
import _ from "lodash";

const Op = Sequelize.Op;

class UserService {
  static async addUser(newUser) {
    try {
      return await db.User.create(newUser);
    } catch (error) {
      return error.message;
    }
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

  static async updateRole(userId, newRole) {
    try {
      return await db.User.update(
        {
          role: newRole
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

  // --------------------------------------- Managers Logic -------------------------------------------------

  static async getManagers() {
    try {
      return await db.User.findAll({ where: { role: "manager" } });
    } catch (error) {
      return error.message;
    }
  }

  static async addManager(newManager) {
    try {
      return await db.User.create(newManager);
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

  // --------------------------------------- Students Logic -------------------------------------------------
  static async getStudents() {
    try {
      return await db.User.findAll({ where: { role: "student" } });
    } catch (error) {
      return error.message;
    }
  }

  static async getPotentialMentors() {
    try {
      const potentialMentors = await db.UserSkill.findAll({
        where: { approved: true, skill_id: { [Op.ne]: null } },
        include: [
          {
            model: db.Skill,
            where: { level_name: "senior" }
          },
          { model: db.User }
        ]
      });

      const result = _.uniqBy(potentialMentors, "user_id");
      return result;
    } catch (error) {
      return error.message;
    }
  }

  static async generateAuthToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_KEY, { expiresIn: "1h" });
  }

  static async addUserSkill(newUserSkill) {
    try {
      return await db.UserSkill.create(newUserSkill);
    } catch (error) {
      return error.message;
    }
  }

  static async approveUserSkill(userSkillId) {
    try {
      return await db.UserSkill.update(
        {
          approved: true
        },
        {
          where: {
            id: userSkillId
          }
        }
      );
    } catch (error) {
      return error.message;
    }
  }

  static async getUserSkillsByUserId(userId) {
    try {
      return await db.UserSkill.findAll({
        where: { user_id: userId },
        attributes: [],
        include: [
          {
            model: db.Skill,
            attributes: [
              "id",
              "name",
              "level_name",
              "time_level",
              "description"
            ]
          }
        ]
      });
    } catch (error) {
      return error.message;
    }
  }
}

export default UserService;
