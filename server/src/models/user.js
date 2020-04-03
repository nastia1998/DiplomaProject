"use strict";
import bcrypt from "bcrypt";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Invalid email. Provide a correct email."
          },
          async isUnique(value) {
            const user = await User.findOne({ where: { email: value } });
            if (user) {
              throw new Error("A user with that email already exists.");
            }
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [6, 100],
            msg: "Password should be more than 5 characters."
          }
        }
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      middleName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      photo: {
        type: DataTypes.BLOB,
        allowNull: true
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "student",
        enum: ["student", "mentor", "manager"]
      }
    },
    {}
  );
  User.associate = ({ Mentor }) => {
    User.hasMany(Mentor, { foreignKey: "user_id", onDelete: "cascade" });
  };
  User.beforeCreate(async user => {
    try {
      user.password = await bcrypt.hash(user.password, 8);
    } catch (error) {
      throw new Error(error.message, "Something went wrong");
    }
  });

  User.beforeUpdate(async user => {
    try {
      if (user.password) {
        user.password = await bcrypt.hash(user.dataValues.password, 8);
      }
    } catch (error) {
      throw new Error("Could not update the password");
    }
  });
  return User;
};
