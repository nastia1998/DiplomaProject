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
    Skill.hasMany(Level, { foreignKey: "fk_level_id" });
  };
  return Skill;
};
