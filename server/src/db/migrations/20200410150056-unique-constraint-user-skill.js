"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint(
      "UserSkills",
      ["user_id", "skill_id", "mentor_id"],
      {
        type: "unique",
        name: "unique_user_id_skill_id_mentor_id",
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      "UserSkills",
      "unique_user_id_skill_id_mentor_id"
    );
  },
};
