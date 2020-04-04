"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserSkill = sequelize.define(
    "UserSkill",
    {
      approved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {}
  );
  UserSkill.associate = ({ User, Skill }) => {
    UserSkill.belongsTo(User, { foreignKey: "user_id" });
    UserSkill.belongsTo(Skill, { foreignKey: "skill_id" });
  };
  return UserSkill;
};
