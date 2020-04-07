import db from "../models";
import levelService from "./levelService";
import { QueryTypes } from "sequelize";

class SkillService {
  static async addSkill(newSkill) {
    try {
      return await db.Skill.create(newSkill);
    } catch (error) {
      return error.message;
    }
  }

  static async getSkills() {
    try {
      return await db.Skill.findAll({
        order: ["id"]
      });
    } catch (error) {
      return error.message;
    }
  }

  static async getSkillsForUser(userId) {
    try {
      return await db.sequelize.query(
        'SELECT * FROM "Skills" WHERE id NOT IN (SELECT skill_id from "UserSkills" WHERE user_id = :id)',
        { replacements: { id: userId }, type: QueryTypes.SELECT }
      );
    } catch (error) {
      return error.message;
    }
  }

  static async removeSkill(id) {
    try {
      const skill = await this.findSkill(id);
      skill.destroy();
      return skill;
    } catch (error) {
      return error.message;
    }
  }

  static async findSkill(id) {
    try {
      return await db.Skill.findByPk(id);
    } catch (error) {
      return error.message;
    }
  }

  // static async getSkillByLevel(level_id) {
  //   try {
  //     return await db.Skill.findAll({
  //       where: {
  //         level_id
  //       },
  //       include: {
  //         model: db.Level,
  //         attributes: ["id", "value", "time_level"]
  //       }
  //     });
  //   }
  // }

  static async updateSkillInfo(skillInfo, skillId) {
    try {
      return await db.Skill.update(
        {
          name: skillInfo.name,
          level_name: skillInfo.level_name,
          time_level: skillInfo.time_level,
          description: skillInfo.description
        },
        {
          where: {
            id: skillId
          }
        }
      );
    } catch (error) {
      return error.message;
    }
  }
}

export default SkillService;
