"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("Levels", ["value"], {
      type: "check",
      where: {
        value: ["junior", "middle", "senior"]
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint("Levels", "Levels_value_ck");
  }
};
