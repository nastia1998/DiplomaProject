import db from "../models";

class LevelService {
  static async addLevel(newLevel) {
    try {
      return await db.Level.create(newLevel);
    } catch (error) {
      return error.message;
    }
  }

  static async getLevels() {
    try {
      return await db.Level.findAll();
    } catch (error) {
      return error.message;
    }
  }

  static async removeLevel(id) {
    try {
      const level = await this.findLevel(id);
      level.destroy();
      return level;
    } catch (error) {
      return error.message;
    }
  }

  static async findLevel(id) {
    try {
      return await db.Level.findByPk(id);
    } catch (error) {
      return error.message;
    }
  }

  static async updateLevelInfo(levelInfo, levelId) {
    try {
      return await db.Level.update(
        {
          value: levelInfo.value,
          time_level: levelInfo.time_level,
          description: levelInfo.description
        },
        {
          where: {
            id: levelId
          }
        }
      );
    } catch (error) {
      return error.message;
    }
  }
}

export default LevelService;
