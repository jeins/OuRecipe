'use strict';

var faker = require('faker'),
    crypto = require('crypto'),
    moment = require('moment'),
    userField = require('../../application/User/Field'),
    config = require('../../config/config.js');

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
    var getHash = function(string){
      return crypto
          .createHmac('sha256', config.secret)
          .update(string)
          .digest('hex');
    };

    arrData.push({
      firstName: 'Budi',
      lastName: 'Santoso',
      email: "admin@demo.com",
      password: getHash("admin"),
      country: 'Indonesia',
      city: 'Bekasi',
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt:  moment().format('YYYY-MM-DD HH:mm:ss')
    });

    for(var i=0; i<100; i++){
      arrData.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: getHash(faker.internet.email()),
        country: faker.address.county(),
        city: faker.address.city(),
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt:  moment().format('YYYY-MM-DD HH:mm:ss')
      });
    }

    return queryInterface.bulkInsert(userField.tableName, arrData);
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
