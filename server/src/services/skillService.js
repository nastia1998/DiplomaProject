import db from "../models";
import levelService from "./levelService";

class SkillService {
  static async addSkill(newSkill, levelId) {
    try {
      const level = await levelService.findLevel(levelId);
      newSkill.level_id = level.id;
      return await db.Skill.create(newSkill);
    } catch (error) {
      return error.message;
    }
  }

  static async getSkills() {
    try {
      return await db.Skill.findAll();
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

  static async updateSkillInfo(skillInfo, skillId) {
    try {
      return await db.Skill.update(
        {
          name: skillInfo.name,
          level_id: skillInfo.level_id
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
