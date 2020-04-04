"use strict";
module.exports = (sequelize, DataTypes) => {
  const Skill = sequelize.define(
    "Skill",
    {
      name: DataTypes.STRING
    },
    {}
  );
  Skill.associate = ({ Level, User, UserSkill }) => {
    Skill.belongsTo(Level, { foreignKey: "level_id" });
    Skill.belongsToMany(User, { through: UserSkill, foreignKey: "skill_id" });
  };
  return Skill;
};
