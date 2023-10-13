'use strict';

/** @type {import('sequelize-cli').Migration} */

const songArr = [
  {
    userId: 1,
    albumId: 1,
    title: "You're Not You Anymore",
    description: "Metal",
    url: "music.com",
    imageUrl:
      "https://images.pexels.com/photos/1713953/pexels-photo-1713953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    userId: 2,
    albumId: 2,
    title: "Nothing Left To Love",
    description: "Metal",
    url: "music.com",
    imageUrl:
      "https://images.pexels.com/photos/1713953/pexels-photo-1713953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    userId: 3,
    albumId: 3,
    title: "Whispers of Your Death",
    description: "Metal",
    url: "music.com",
    imageUrl:
      "https://images.pexels.com/photos/1713953/pexels-photo-1713953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Songs', songArr)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Songs', songArr)
  }
};
