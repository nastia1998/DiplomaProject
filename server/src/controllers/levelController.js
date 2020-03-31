import levelService from "../services/levelService";

class levelController {
  static async addLevel(req, res) {
    const { value, time_level, description } = req.body;
    if (!value || !time_level)
      return res.json("Value and time for level are required!");
    const newLevel = req.body;
    try {
      const createdLevel = await levelService.addLevel(newLevel);
      return res.status(201).send({ createdLevel });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  static async getLevels(req, res) {
    try {
      const levels = await levelService.getLevels();
      return res.status(200).send(levels);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  static async updateLevelInfo(req, res) {
    const levelInfo = req.body;
    const { level_id } = req.params;
    try {
      await levelService.updateLevelInfo(levelInfo, level_id);
      const updatedLevel = await levelService.findLevel(level_id);
      return res.status(200).json(updatedLevel);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  static async removeLevel(req, res) {
    try {
      const { level_id } = req.params;
      const remLevel = await levelService.removeLevel(level_id);
      return res.send(remLevel);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
}

export default levelController;
