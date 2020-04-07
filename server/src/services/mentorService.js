import db from "../models";
import validator from "validator";
import Sequelize from "sequelize";
const Op = Sequelize.Op;

class MentorService {
  // --------------------------------------- Mentors Logic -------------------------------------------------

  static async getMentors() {
    try {
      return await db.Mentor.findAll({
        include: [
          {
            model: db.User,
            attributes: ["id", "email", "firstName", "lastName", "middleName"]
          }
        ]
      });
      // let mentorsSkills = [];
      // let mentor = {};
      // console.log(mentors.length);
      // //for (let i = 0; i < mentors.lenght; i++) {
      // mentors.forEach(async i => {
      //   // console.log(9999, i.id);
      //   // mentor = await db.UserSkill.findAll({
      //   //   where: { user_id: i.id, approved: true },
      //   //   include: [{ model: db.Skill }]
      //   // });
      //   mentor = await this.getMentorSkills(i.id);
      //   console.log(4444, mentor);
      //   mentorsSkills.push(mentor);
      //   console.log("here", mentorsSkills);
      // });
      // console.log(9999, mentors[i].id);
      // let mentor = await db.UserSkill.findAll({
      //   where: { user_id: mentors[i].id, approved: true },
      //   include: [{ model: db.Skill }]
      // });
      // console.log(4444, mentor);
      // mentorsSkills.push(mentor);
      //}

      // async function test() {
      //   try {
      //     mentors.forEach(async i => {
      //       try {
      //         mentor = await this.getMentorSkills(i.id);
      //         mentorsSkills.push(mentor);
      //       } catch (e) {
      //         return error.message;
      //       }
      //     });
      //     return mentorsSkills;
      //   } catch (error) {
      //     return error.message;
      //   }
      // }
      // const a = await test();
      // console.log("HERE", a);
      // mentors.push(a);
      // return mentors;
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
        include: [{ model: db.User }]
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
            model: db.User
          }
        ]
      });
      return await db.UserSkill.findAll({
        attributes: [],
        where: {
          user_id: mentorWithUserInfo.User.id,
          approved: true,
          skill_id: { [Op.ne]: null }
        },
        include: [
          {
            model: db.Skill,
            where: { level_name: "senior" }
          }
        ]
      });
      // return await db.UserSkill.findAll({
      //   where: { user_id: mentorWithUserInfo.id, approved: true },
      //   include: [{ model: db.Skill }]
      // });
    } catch (error) {
      return error.message;
    }
  }
}

export default MentorService;
