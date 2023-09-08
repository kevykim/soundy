'use strict';

/** @type {import('sequelize-cli').Migration} */

const playlistsArr = [
  {
    userId: 1,
    name: "LOUD",
    imageUrl: "music.com",
  },
  {
    userId: 2,
    name: "REEEEE",
    imageUrl: "music.com",
  },
  {
    userId: 3,
    name: "WOWWEE",
    imageUrl: "music.com",
  },
];

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Playlists', playlistsArr)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Playlists', playlistsArr)
  }
};
