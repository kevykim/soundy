'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcryptjs");

const userArr = [
  {
    email: "demo@user.io",
    username: "Demo-lition",
    hashedPassword: bcrypt.hashSync("password"),
    profileImg:
      "https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png",
  },
  {
    email: "user1@user.io",
    username: "FakeUser1",
    hashedPassword: bcrypt.hashSync("password2"),
    profileImg:
      "https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png",
  },
  {
    email: "user2@user.io",
    username: "FakeUser2",
    hashedPassword: bcrypt.hashSync("password3"),
    profileImg:
      "https://cdn1.iconfinder.com/data/icons/user-pictures/100/boy-512.png",
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      userArr,
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(
      "Users",
      {
        username: { [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2"] },
      },
      {}
    );
  },
};