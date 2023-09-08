'use strict';

/** @type {import('sequelize-cli').Migration} */

const albumsArr = [
  {
    userId: 1,
    title: "You're Not You Anymore",
    description: "Counterpart's fifth album",
    imageUrl: "test.com",
    year: 2017,
  },
  {
    userId: 2,
    title: "Nothing Left to Love",
    description: "Counterpart's sixth album",
    imageUrl: "test.com",
    year: 2019,
  },
  {
    userId: 3,
    title: "A Eulogy for Those Still Here",
    description: "Counterpart's seventh album",
    imageUrl: "test.com",
    year: 2022,
  },
];

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Albums",
      albumsArr
   ,);
  },

  async down (queryInterface, Sequelize) {
    const op = Sequelize.Op;
    await queryInterface.bulkDelete("Albums", 
    {
      userId: {[op.in]: [1,2,3]}
    }, {}
    )
  }
};
