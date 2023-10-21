'use strict';

/** @type {import('sequelize-cli').Migration} */

const commentsArr = [
  {
    userId: 2,
    songId: 1,
    body: "Nice song",
  },
  {
    userId: 3,
    songId: 2,
    body: "Great song",
  },
  {
    userId: 1,
    songId: 3,
    body: "Excellent song",
  },
  {
    userId: 3,
    songId: 1,
    body: "Nice song",
  },
  {
    userId: 1,
    songId: 2,
    body: "Great song",
  },
  {
    userId: 2,
    songId: 3,
    body: "Excellent song",
  },
  {
    userId: 2,
    songId: 1,
    body: "Nice song",
  },
  {
    userId: 3,
    songId: 2,
    body: "Great song",
  },
  {
    userId: 1,
    songId: 3,
    body: "Excellent song",
  },
];

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Comments', commentsArr)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', commentsArr)
  },
};
