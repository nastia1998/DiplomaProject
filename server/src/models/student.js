"use strict";
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    "Student",
    {
      start_time_mentor: DataTypes.DATE,
      finish_time_mentor: DataTypes.DATE,
    },
    {}
  );
  Student.associate = ({ UserSkill, Goal }) => {
    Student.belongsTo(UserSkill, { foreignKey: "userskill_id" });
    Student.hasMany(Goal, { foreignKey: "student_id" });
  };
  return Student;
};
