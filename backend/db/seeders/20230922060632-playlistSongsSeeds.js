'use strict';

/** @type {import('sequelize-cli').Migration} */

const playlistSongArr = [
  {
    playlistId: 1,
    songId: 2,
  },
  {
    playlistId: 1,
    songId: 5,
  },
  {
    playlistId: 1,
    songId: 8,
  },
  {
    playlistId: 1,
    songId: 9,
  },
  {
    playlistId: 2,
    songId: 1,
  },
  {
    playlistId: 2,
    songId: 3,
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
