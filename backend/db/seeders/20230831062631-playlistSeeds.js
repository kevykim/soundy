'use strict';

/** @type {import('sequelize-cli').Migration} */

const playlistsArr = [
  {
    userId: 1,
    name: "LOUD",
    imageUrl:
      "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
  {
    userId: 2,
    name: "REEEEE",
    imageUrl:
      "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
  {
    userId: 3,
    name: "WOWWEE",
    imageUrl:
      "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
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
