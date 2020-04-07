"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("Skills", ["level_name"], {
      type: "check",
      where: {
        level_name: ["junior", "middle", "senior"]
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint("Skills", "Skills_level_name_ck");
  }
};
