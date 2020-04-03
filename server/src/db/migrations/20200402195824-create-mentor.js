"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable("Mentors", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        status: {
          type: Sequelize.BOOLEAN
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      })
      .then(() => {
        return queryInterface.addColumn("Mentors", "user_id", {
          type: Sequelize.INTEGER,
          references: {
            model: "Users",
            key: "id"
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL"
        });
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Mentors");
  }
};
