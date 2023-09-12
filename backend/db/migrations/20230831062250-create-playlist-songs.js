'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PlaylistSongs", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      playlistId: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: 'Playlists',
        //   // key: 'id'
        // },
        // onDelete: 'cascade'
      },
      songId: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: 'Songs',
        //   key: 'id'
        // },
        // onDelete: 'cascade'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PlaylistSongs');
  }
};