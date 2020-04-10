"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable("UserSkills", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        is_approved_request: {
          type: Sequelize.BOOLEAN,
        },
        is_approved_skill: {
          type: Sequelize.BOOLEAN,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      })
      .then(() => {
        return queryInterface
          .addColumn("UserSkills", "user_id", {
            type: Sequelize.INTEGER,
            references: {
              model: "Users",
              key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
          })
          .then(() => {
            return queryInterface
              .addColumn("UserSkills", "skill_id", {
                type: Sequelize.INTEGER,
                references: {
                  model: "Skills",
                  key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
              })
              .then(() => {
                return queryInterface.addColumn("UserSkills", "mentor_id", {
                  type: Sequelize.INTEGER,
                  references: {
                    model: "Mentors",
                    key: "id",
                  },
                  onUpdate: "CASCADE",
                  onDelete: "SET NULL",
                });
              });
          });
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("UserSkills");
  },
};
