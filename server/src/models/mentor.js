"use strict";
module.exports = (sequelize, DataTypes) => {
  const Mentor = sequelize.define(
    "Mentor",
    {
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    {}
  );
  Mentor.associate = ({ User }) => {
    Mentor.belongsTo(User, { foreignKey: "user_id" });
  };
  return Mentor;
};
