"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Students", "userskill_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "UserSkills",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Students", "userskill_id");
  },
};
