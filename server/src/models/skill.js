"use strict";
module.exports = (sequelize, DataTypes) => {
  const Skill = sequelize.define(
    "Skill",
    {
      name: DataTypes.STRING,
      level_name: DataTypes.STRING,
      time_level: DataTypes.INTEGER,
      description: DataTypes.STRING
    },
    {}
  );
  Skill.associate = ({ User, UserSkill }) => {
    Skill.belongsToMany(User, { through: UserSkill, foreignKey: "skill_id" });
  };
  return Skill;
};
