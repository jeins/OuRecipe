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
      first_name: 'Budi',
      last_name: 'Santoso',
      email: "admin@demo.com",
      password: getHash("admin"),
      country: 'Indonesia',
      city: 'Bekasi',
      created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      updated_at:  moment().format('YYYY-MM-DD HH:mm:ss')
    });

    for(var i=0; i<100; i++){
      arrData.push({
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        password: getHash(faker.internet.email()),
        country: faker.address.county(),
        city: faker.address.city(),
        created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        updated_at:  moment().format('YYYY-MM-DD HH:mm:ss')
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
