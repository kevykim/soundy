'use strict';

/** @type {import('sequelize-cli').Migration} */

const songArr = [
  {
    userId: 1,
    albumId: 1,
    title: "You're Not You Anymore",
    description: "Metal",
    url: "music.com",
    imageUrl: "image.com",
  },
  {
    userId: 2,
    albumId: 2,
    title: "Nothing Left To Love",
    description: "Metal",
    url: "music.com",
    imageUrl: "image.com",
  },
  {
    userId: 3,
    albumId: 3,
    title: "Whispers of Your Death",
    description: "Metal",
    url: "music.com",
    imageUrl: "image.com",
  },
];

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Songs', )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Songs', )
  }
};
