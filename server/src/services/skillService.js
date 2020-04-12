import db from "../models";
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
        order: ["id"],
      });
    } catch (error) {
      return error.message;
    }
  }

  static async getAvailableSkillsForUser(userId) {
    try {
      return await db.sequelize.query(
        "select distinct on (s.name) s.name, s.level_name, s.id, s.time_level, s.description " +
          'from "UserSkills" as us ' +
          'join "Skills" as s on us.skill_id = s.id ' +
          'join "Users" as u on us.user_id = u.id ' +
          'join "Mentors" as me on u.id = me.user_id ' +
          'where s.id not in (SELECT skill_id from "UserSkills" WHERE user_id = :id) ' +
          "order by s.name, s.level_name",
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

  static async findSkillAsCollection(id) {
    try {
      return await db.Skill.findAll({ where: { id } });
    } catch (error) {
      return error.message;
    }
  }

  static async updateSkillInfo(skillInfo, skillId) {
    try {
      return await db.Skill.update(
        {
          name: skillInfo.name,
          level_name: skillInfo.level_name,
          time_level: skillInfo.time_level,
          description: skillInfo.description,
        },
        {
          where: {
            id: skillId,
          },
        }
      );
    } catch (error) {
      return error.message;
    }
  }
}

export default SkillService;
