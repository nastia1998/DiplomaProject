"use strict";
module.exports = (sequelize, DataTypes) => {
  const Mentor = sequelize.define(
    "Mentor",
    {
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {}
  );
  Mentor.associate = ({ User, UserSkill }) => {
    Mentor.belongsTo(User, { foreignKey: "user_id" });
    Mentor.hasMany(UserSkill, { foreignKey: "mentor_id" });
  };
  return Mentor;
};
