import skillService from "../services/skillService";

class skillController {
  static async addSkill(req, res) {
    const { name, level_name, time_level } = req.body;
    if (!name || !level_name || !time_level)
      return res.json("Required fields are empty!");
    const newSkill = req.body;
    try {
      const createdSkill = await skillService.addSkill(newSkill);
      return res.status(201).send({ createdSkill });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  static async getSkills(req, res) {
    try {
      const skills = await skillService.getSkills();
      return res.status(200).send(skills);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  static async getAvailableSkillsForUser(req, res) {
    try {
      const { user_id } = req.params;
      const availableSkills = await skillService.getAvailableSkillsForUser(
        user_id
      );
      return res.status(200).send(availableSkills);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  static async updateSkillInfo(req, res) {
    const skillInfo = req.body;
    const { skill_id } = req.params;
    try {
      await skillService.updateSkillInfo(skillInfo, skill_id);
      const updatedSkill = await skillService.findSkill(skill_id);
      return res.status(200).json(updatedSkill);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  static async removeSkill(req, res) {
    try {
      const { skill_id } = req.params;
      const remSkill = await skillService.removeSkill(skill_id);
      return res.send(remSkill);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
}

export default skillController;
