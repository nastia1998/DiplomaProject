import db from "../models";

class GoalService {
  static async addGoal(newGoal) {
    try {
      return await db.Goal.create(newGoal);
    } catch (error) {
      return error.message;
    }
  }
}

export default GoalService;
