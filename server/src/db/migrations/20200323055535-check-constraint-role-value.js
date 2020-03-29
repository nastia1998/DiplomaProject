"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("Users", ["role"], {
      type: "check",
      where: {
        role: ["student", "mentor", "manager", "admin"]
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint("Users", "Users_role_ck");
  }
};
