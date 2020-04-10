"use strict";
module.exports = (sequelize, DataTypes) => {
  const student = sequelize.define(
    "Student",
    {
      start_time_mentor: DataTypes.DATE,
      finish_time_mentor: DataTypes.DATE,
    },
    {}
  );
  student.associate = function (models) {
    // associations can be defined here
  };
  return student;
};
