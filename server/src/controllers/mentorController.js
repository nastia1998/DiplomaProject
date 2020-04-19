import mentorService from "../services/mentorService";
import userService from "../services/userService";

class mentorController {
  static async addMentor(req, res) {
    const { user_id } = req.body;

    try {
      if (!user_id) {
        return res.json("Identifier of user should be set");
      }
      const mentorExist = await mentorService.findMentorByUserId(user_id);
      if (mentorExist.length === 0) {
        const user = await userService.findUser(user_id);
        user.password = undefined;
        if (user) {
          await userService.updateRole(user.id, "mentor");
          const mentor = await mentorService.addMentor(req.body);
          const createdMentorInfo = await mentorService.findMentorwithInfo(
            mentor.id
          );
          createdMentorInfo.User.password = undefined;
          const mentorData = { mentor: createdMentorInfo };
          return res.status(201).send({ mentorData });
        } else {
          return res.json("No user with such id!");
        }
      } else {
        return res.json("Mentor already exists!");
      }
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  static async getMentors(req, res) {
    try {
      const mentors = await mentorService.getMentors();
      return res.status(200).send(mentors);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
  static async removeMentor(req, res) {
    try {
      const { mentor_id } = req.params;
      const remMentor = await mentorService.removeMentor(mentor_id);
      await userService.updateRole(remMentor.user_id, "student");
      const user = await userService.findUser(remMentor.user_id);
      return res.send(user);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  static async getMentorSkills(req, res) {
    try {
      const { mentor_id } = req.params;
      const mentor = await mentorService.getMentorSkills(mentor_id);
      return res.status(200).send(mentor);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  static async getMentorsBySkillId(req, res) {
    try {
      const { skill_id } = req.params;
      const mentors = await mentorService.getMentorsBySkillId(skill_id);
      return res.status(200).send(mentors);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
}

export default mentorController;
