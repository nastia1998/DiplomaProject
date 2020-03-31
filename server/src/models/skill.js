"use strict";
module.exports = (sequelize, DataTypes) => {
  const Skill = sequelize.define(
    "Skill",
    {
      name: DataTypes.STRING
    },
    {}
  );
  Skill.associate = ({ Level }) => {
    Skill.belongsTo(Level, { foreignKey: "level_id" });
  };
  return Skill;
};
