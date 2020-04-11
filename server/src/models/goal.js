"use strict";
module.exports = (sequelize, DataTypes) => {
  const Goal = sequelize.define(
    "Goal",
    {
      date_review: DataTypes.DATE,
    },
    {}
  );
  Goal.associate = ({ Student }) => {
    Goal.belongsTo(Student, { foreignKey: "student_id" });
  };
  return Goal;
};
