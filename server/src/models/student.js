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
  Student.associate = ({ UserSkill }) => {
    Student.belongsTo(UserSkill, { foreignKey: "userskill_id" });
  };
  return Student;
};
