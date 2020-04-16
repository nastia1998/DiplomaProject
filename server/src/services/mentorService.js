import db from "../models";
import validator from "validator";
import Sequelize from "sequelize";
const Op = Sequelize.Op;
import { QueryTypes } from "sequelize";

class MentorService {
  // --------------------------------------- Mentors Logic -------------------------------------------------

  static async getMentors() {
    try {
      return await db.Mentor.findAll({
        include: [
          {
            model: db.User,
            attributes: ["id", "email", "firstName", "lastName", "middleName"],
          },
        ],
      });
    } catch (error) {
      return error.message;
    }
  }

  static async addMentor(newMentor) {
    try {
      return await db.Mentor.create(newMentor);
    } catch (error) {
      return error.message;
    }
  }

  static async removeMentor(id) {
    try {
      const mentor = await this.findMentor(id);
      mentor.destroy();
      return mentor;
    } catch (error) {
      return error.message;
    }
  }

  static async findMentor(id) {
    try {
      return await db.Mentor.findByPk(id);
    } catch (error) {
      return error.message;
    }
  }

  static async findMentorByUserId(userId) {
    try {
      return await db.Mentor.findAll({ where: { user_id: userId } });
    } catch (error) {
      return error.message;
    }
  }

  static async findMentorwithInfo(id) {
    try {
      return await db.Mentor.findByPk(id, {
        include: [{ model: db.User }],
      });
    } catch (error) {
      return error.message;
    }
  }

  static async getMentorSkills(id) {
    try {
      const mentorWithUserInfo = await db.Mentor.findByPk(id, {
        include: [
          {
            model: db.User,
          },
        ],
      });
      return await db.UserSkill.findAll({
        attributes: [],
        where: {
          user_id: mentorWithUserInfo.User.id,
          is_approved_skill: true,
          skill_id: { [Op.ne]: null },
        },
        include: [
          {
            model: db.Skill,
            where: { level_name: "senior" },
          },
        ],
      });
    } catch (error) {
      return error.message;
    }
  }

  static async getMentorsBySkillId(skill_id) {
    try {
      return await db.sequelize.query(
        'select distinct on(me.id) me.id, u.email, u."firstName", u."lastName" from "Users" as u ' +
          'join "Mentors" as me on u.id = me.user_id ' +
          'join "UserSkills" as us on us.user_id = u.id ' +
          'join "Skills" as s on us.skill_id = s.id where s.id = :id ' +
          "order by me.id",
        { replacements: { id: skill_id }, type: QueryTypes.SELECT }
      );
    } catch (error) {
      return error.message;
    }
  }
}

export default MentorService;
