"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserSkill = sequelize.define(
    "UserSkill",
    {
      is_approved_request: {
        type: DataTypes.BOOLEAN,
      },
      is_approved_skill: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {}
  );
  UserSkill.associate = ({ User, Skill, Student, Mentor }) => {
    UserSkill.belongsTo(User, { foreignKey: "user_id" });
    UserSkill.belongsTo(Skill, { foreignKey: "skill_id" });
    UserSkill.hasMany(Student, { foreignKey: "userskill_id" });
    UserSkill.belongsTo(Mentor, { foreignKey: "mentor_id" });
  };
  return UserSkill;
};
