import db from "../models";
import Sequelize from "sequelize";
import { QueryTypes } from "sequelize";
import _ from "lodash";

const Op = Sequelize.Op;

class UserSkillService {
  static async addUserSkill(newUserSkill) {
    try {
      return await db.UserSkill.create(newUserSkill);
    } catch (error) {
      return error.message;
    }
  }

  static async findUserSkill(userskill_id) {
    try {
      return await db.UserSkill.findAll({
        attributes: ["id", "user_id", "skill_id", "mentor_id"],
        where: { id: userskill_id },
      });
    } catch (error) {
      return error.message;
    }
  }

  static async approveUserSkill(userSkillId) {
    try {
      return await db.UserSkill.update(
        {
          is_approved_skill: true,
        },
        {
          where: {
            id: userSkillId,
          },
        }
      );
    } catch (error) {
      return error.message;
    }
  }

  static async getUserSkillsByUserId(userId) {
    try {
      return await db.sequelize.query(
        "select distinct on (s.name) s.name, s.id, s.level_name, s.time_level, s.description, us.is_approved_skill " +
          'from "UserSkills" as us ' +
          'join "Skills" as s on us.skill_id = s.id ' +
          "where us.user_id = :id " +
          "order by s.name, s.level_name desc",
        { replacements: { id: userId }, type: QueryTypes.SELECT }
      );
    } catch (error) {
      return error.message;
    }
  }

  static async getPotentialMentors() {
    try {
      const potentialMentors = await db.UserSkill.findAll({
        where: { is_approved_skill: true, skill_id: { [Op.ne]: null } },
        include: [
          {
            model: db.Skill,
            where: { level_name: "senior" },
          },
          { model: db.User },
        ],
      });

      const result = _.uniqBy(potentialMentors, "user_id");
      return result;
    } catch (error) {
      return error.message;
    }
  }

  static async sendRequestToMentor(newRequest) {
    try {
      return await db.UserSkill.create(newRequest);
    } catch (error) {
      return error.message;
    }
  }

  static async getAllRequests(user_id) {
    try {
      return await db.sequelize.query(
        // 'select us.id, u."firstName", u."lastName", s.name, s.level_name, s.time_level, us.is_approved_request ' +
        //   'from "UserSkills" as us join "Skills" as s on us.skill_id = s.id ' +
        //   'join "Users" as u on us.user_id = u.id ' +
        //   "where us.mentor_id = :mentor_id",
        'select us.id, s.id as skill_id, s.name, s.level_name, u.id as user_id, u.email, u."firstName", u."lastName" ' +
          'from "UserSkills" as us ' +
          'join "Mentors" as me on us.mentor_id = me.id ' +
          'join "Users" as u on us.user_id = u.id ' +
          'join "Skills" as s on us.skill_id = s.id ' +
          "where me.user_id = :user_id and us.is_approved_request = false",
        { replacements: { user_id: user_id }, type: QueryTypes.SELECT }
      );
    } catch (error) {
      return error.message;
    }
  }

  static async approveRequest(userskill_id) {
    try {
      await db.UserSkill.update(
        { is_approved_request: true },
        { where: { id: userskill_id } }
      );
    } catch (error) {
      return error.message;
    }
  }

  static async getUnconfirmedRequests(user_id) {
    try {
      return await db.sequelize.query(
        'select me.id as mentor_id, s.id as skill_id, us.id, s.name, s.level_name, u.email, u."firstName", u."lastName" ' +
          'from "UserSkills" as us join "Skills" as s on us.skill_id = s.id ' +
          'join "Mentors" as me on us.mentor_id = me.id ' +
          'join "Users" as u on me.user_id = u.id ' +
          "where us.user_id = :user_id and us.is_approved_request = false",
        { replacements: { user_id: user_id }, type: QueryTypes.SELECT }
      );
    } catch (error) {
      return error.message;
    }
  }

  static async getConfirmedRequests(user_id) {
    try {
      return await db.sequelize.query(
        'select me.id as mentor_id, s.id as skill_id, s.name, s.level_name, u.email, u."firstName", u."lastName" ' +
          'from "UserSkills" as us join "Skills" as s on us.skill_id = s.id ' +
          'join "Mentors" as me on us.mentor_id = me.id ' +
          'join "Users" as u on me.user_id = u.id ' +
          "where us.user_id = :user_id and us.is_approved_request = true " +
          "and us.is_approved_skill = false",
        { replacements: { user_id: user_id }, type: QueryTypes.SELECT }
      );
    } catch (error) {
      return error.message;
    }
  }

  static async cancelRequest(userskill_id) {
    try {
      return await db.sequelize.query(
        'delete from "UserSkills" where id = :id ',
        { replacements: { id: userskill_id }, type: QueryTypes.SELECT }
      );
    } catch (error) {
      return error.message;
    }
  }

  static async getStudetsForMentor(user_id) {
    try {
      return await db.sequelize.query(
        'select us.id as user_skill_id, u.id as user_id, u.email, u."firstName", u."lastName", s.name, s.level_name, s.time_level from "Students" as st ' +
          'join "UserSkills" as us on us.id = st.userskill_id ' +
          'join "Users" as u on us.user_id = u.id ' +
          'join "Skills" as s on us.skill_id = s.id ' +
          'join "Mentors" as me on us.mentor_id = me.id ' +
          "where me.user_id = :id and us.is_approved_skill = false and us.is_approved_request = true",
        { replacements: { id: user_id }, type: QueryTypes.SELECT }
      );
    } catch (error) {
      return error.message;
    }
  }
}

export default UserSkillService;
