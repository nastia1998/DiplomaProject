import db from "../models";

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

  static async findMentorwithInfo(id) {
    try {
      return await db.Mentor.findByPk(id, {
        include: [
          {
            model: db.User
          }
        ]
      });
    } catch (error) {
      return error.message;
    }
  }
}

export default MentorService;
