'use strict';

var favoriteField = require('../../application/Favorite/Field'),
    moment = require('moment');

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
      var arrData = [];

      arrData[0] = {};
      arrData[0][favoriteField.entity.userId.name] = 1;
      arrData[0][favoriteField.entity.recipeId.name] = 2;
      arrData[0][favoriteField.entity.createdAt.name] = moment().format('YYYY-MM-DD HH:mm:ss');
      arrData[0][favoriteField.entity.updatedAt.name] = moment().format('YYYY-MM-DD HH:mm:ss');

      arrData[1] = {};
      arrData[1][favoriteField.entity.userId.name] = 1;
      arrData[1][favoriteField.entity.recipeId.name] = 3;
      arrData[1][favoriteField.entity.createdAt.name] = moment().format('YYYY-MM-DD HH:mm:ss');
      arrData[1][favoriteField.entity.updatedAt.name] = moment().format('YYYY-MM-DD HH:mm:ss');

      arrData[2] = {};
      arrData[2][favoriteField.entity.userId.name] = 2;
      arrData[2][favoriteField.entity.recipeId.name] = 1;
      arrData[2][favoriteField.entity.createdAt.name] = moment().format('YYYY-MM-DD HH:mm:ss');
      arrData[2][favoriteField.entity.updatedAt.name] = moment().format('YYYY-MM-DD HH:mm:ss');

      return queryInterface.bulkInsert(favoriteField.tableName, arrData);
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
