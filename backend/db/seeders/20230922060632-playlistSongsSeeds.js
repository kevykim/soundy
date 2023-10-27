'use strict';

/** @type {import('sequelize-cli').Migration} */

const playlistSongArr = [
  {
    playlistId: 1,
    songId: 1,
  },
  {
    playlistId: 1,
    songId: 4,
  },
  {
    playlistId: 1,
    songId: 7,
  },
  {
    playlistId: 1,
    songId: 10,
  },
  {
    playlistId: 2,
    songId: 2,
  },
  {
    playlistId: 2,
    songId: 5,
  },
  {
    playlistId: 2,
    songId: 8,
  },
  {
    playlistId: 3,
    songId: 3,
  },
  {
    playlistId: 3,
    songId: 6,
  },
  {
    playlistId: 3,
    songId: 9,
  },
];



module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('PlaylistSongs', playlistSongArr);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("PlaylistSongs", playlistSongArr);

  }
};
