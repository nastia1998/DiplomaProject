import userskillService from "../services/userskillService";
import studentService from "../services/studentService";
import skillService from "../services/skillService";
import goalService from "../services/goalService";

class userskillController {
  static async addMonths(date, months) {
    let d = date.getDate();
    date.setMonth(date.getMonth() + +months);
    if (date.getDate() != d) {
      date.setDate(0);
    }
    return date;
  }

  static async addUserSkill(req, res) {
    try {
      const { user_id, skill_id } = req.body;
      if (!user_id || !skill_id) {
        return res.json("IDs of user and skill are required!");
      }
      const newUserSkill = req.body;
      const createdUserSkill = await userskillService.addUserSkill(
        newUserSkill
      );
      return res.status(201).send({ createdUserSkill });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  static async approveUserSkill(req, res) {
    try {
      const { userskill_id } = req.params;
      const count = await userskillService.approveUserSkill(userskill_id);
      return res.status(200).send(count);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  static async getUserSkillsByUserId(req, res) {
    try {
      const { user_id } = req.params;
      const skills = await userskillService.getUserSkillsByUserId(user_id);
      return res.status(200).send(skills);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  static async getPotentialMentors(req, res) {
    try {
      const potentialMentors = await userskillService.getPotentialMentors();
      return res.status(200).send(potentialMentors);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  static async sendRequestToMentor(req, res) {
    try {
      const { user_id, skill_id, mentor_id } = req.body;
      if (!user_id || !skill_id || !mentor_id) {
        return res.json("IDs of user, skill and mentor are required!");
      }
      const newRequest = req.body;
      console.log(newRequest);
      await userskillService.sendRequestToMentor(newRequest);
      return res.status(201).send();
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  static async getAllRequests(req, res) {
    try {
      const { mentor_id } = req.params;
      const requests = await userskillService.getAllRequests(mentor_id);
      return res.status(200).send(requests);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  static async approveRequest(req, res) {
    try {
      const { userskill_id } = req.params;
      await userskillService.approveRequest(userskill_id);
      const userskill = await userskillService.findUserSkill(userskill_id);
      const skill_id = userskill.map((i) => i.skill_id);
      const student = {
        userskill_id: userskill_id,
        start_time_mentor: Date.now(),
      };
      const createdStudent = await studentService.addStudent(student);
      const skill = await skillService.findSkillAsCollection(Number(skill_id));
      const time_level = skill.map((i) => i.time_level);
      const newGoal = {
        student_id: createdStudent.id,
        date_review: await userskillController.addMonths(
          new Date(),
          Number(time_level)
        ),
      };
      const createdGoal = await goalService.addGoal(newGoal);
      return res.status(200).send(createdGoal);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  static async getUnconfirmedRequests(req, res) {
    try {
      const { user_id } = req.params;
      console.log(1111, user_id);
      const unconfirmedRequests = await userskillService.getUnconfirmedRequests(
        Number(user_id)
      );
      console.log(unconfirmedRequests);
      return res.status(200).send(unconfirmedRequests);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
}

export default userskillController;
