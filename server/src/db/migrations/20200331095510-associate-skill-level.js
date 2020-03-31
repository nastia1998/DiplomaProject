"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Skills", "level_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "Levels",
        key: "id"
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Skills", "level_id");
  }
};
