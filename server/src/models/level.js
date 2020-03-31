"use strict";
module.exports = (sequelize, DataTypes) => {
  const Level = sequelize.define(
    "Level",
    {
      value: {
        type: DataTypes.STRING,
        allowNull: false
      },
      time_level: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {}
  );
  Level.associate = ({ Skill }) => {
    Level.belongsTo(Skill, { foreignKey: "fk_level_id" });
  };
  return Level;
};
