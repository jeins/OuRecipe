'use strict';

var userField = require('../../application/User/Field'),
    _ = require('lodash');

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

      var entities = {};
      _.forEach(userField.entity, function(entity){
          entities[entity.name] = {};
          entities[entity.name]['type'] = Sequelize[entity.type.toUpperCase()];
          if(_.hasIn(entity, 'primaryKey')) entities[entity.name]['primaryKey'] = entity.primaryKey;
          if(_.hasIn(entity, 'autoIncrement')) entities[entity.name]['autoIncrement'] = entity.autoIncrement;
      });

    queryInterface.createTable(userField.tableName, entities);
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
