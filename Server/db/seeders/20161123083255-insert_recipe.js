'use strict';

var recipeField = require('../../application/Recipe/Field'),
    config = require('../../config/config.js'),
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

    arrData[0] = [];
    arrData[0][recipeField.entity.userId.name] = 1;
    arrData[0][recipeField.entity.title.name] = "Ayam goreng mentega";
    arrData[0][recipeField.entity.description.name] = "Ayam goreng mentega";
    arrData[0][recipeField.entity.ingredients.name] = JSON.stringify([{id: 1, name: "1 ekor ayam kampung direbus"}, {id: 2, name: "1 sdm mentega"}, {id: 3, name: "1 sdm EVOO"}, {id: 4, name: "5 sdm kecap inggris"}, {id: 5, name: "2 sdm kecap inggris (utk marinated)"}, {id: 6, name: "1 sdm kecap manis"}, {id: 7, name: "2 sdm kikkoman sweet sou sauce"}, {id: 8, name: "1 siung bawang putih"}, {id: 9, name: "1/2 bawang bombay potong besar"}, {id: 10, name: "100 ml air"}, {id: 11, name: "1 buah jeruk limo"}, {id: 12, name: "Minyak goreng"}]);
    arrData[0][recipeField.entity.steps.name] = JSON.stringify([{id:1, description:"Marinated ayam yang sudah direbus dengan kecap inggris, diamkan di kulkas 1 malam (atau 30 menit)"}, {id:2, description:"Goreng ayam yang sudah di marinated tadi hingga setengah garing, lalu sisihkan"}, {id:3, description:"Di pan terpisah, masukan EVOO (atau bs diganti dengan minyak sayur lainnya) dan mentega, lalu tumis bawang bombay & bawang putih sampai harum"}, {id:4, description:"Masukan kecap inggris, kecap sweet soy sauce kikkoman, kecap manis, tambahkan air sedikit atau selera... masak hinggs tercampur rata.."}, {id:5, description:"Tambahan perasan jeruk limo di sauce pan, lalu masukan ayam yang sudah digoreng tadi... aduk2 dan Siap dihidangkan"}]);
    arrData[0][recipeField.entity.preparationTime.name] = "30 menit";
    arrData[0][recipeField.entity.cookTime.name] = "1 jam";
    arrData[0][recipeField.entity.serving.name] = 5;
    arrData[0][recipeField.entity.cuisine.name] = "Asia Indonesia";
    arrData[0][recipeField.entity.category.name] = "Chicken";
    arrData[0][recipeField.entity.difficultyLevel.name] = "advance";
    arrData[0][recipeField.entity.photoName.name] = "";
    arrData[0][recipeField.entity.videoUrl.name] = "";
    arrData[0][recipeField.entity.createdAt.name] = moment().format('YYYY-MM-DD HH:mm:ss');
    arrData[0][recipeField.entity.updatedAt.name] = moment().format('YYYY-MM-DD HH:mm:ss');

    arrData[1] = [];
    arrData[1][recipeField.entity.userId.name] = 2;
    arrData[1][recipeField.entity.title.name] = "Ayam goreng mentega";
    arrData[1][recipeField.entity.description.name] = "Dari kemarin kepingin ayam panggang tp ke pasar ga kebagian dapat ayam kampung, akhirnya hr ini alhamdulillah keturutan. Bumbunya ngawur suka2 kokinya hihihi.... yg penting enak, suami & nenek suka ";
    arrData[1][recipeField.entity.ingredients.name] = JSON.stringify([{id: 1, name: "1 ekor ayam kampung"}, {id: 2, name: "250 gr cabai merah besar"}, {id: 3, name: "12 siung bawang merah"}, {id: 4, name: "5 siung bawang putih"}, {id: 5, name: "2 ruas jari kunyit dibakar bersama kulitnya kmdn dikerok"}, {id: 6, name: "2 ruas jari jahe"}, {id: 7, name: "1 sdt terasi matang"}, {id: 8, name: "secukupnya gula merah"}, {id: 9, name: "secukupnya gula pasir & garam"}, {id: 10, name: "santan"}, {id: 11, name: "sdkt minyak goreng untuk menumis"}]);
    arrData[1][recipeField.entity.steps.name] = JSON.stringify([{id:1, description:"Siapkan ayam, potong mjd 4bagian besar. Lumuri dg air jeruk nipis & garam sambil agak digosok2, diamkan 10menit kmdn cuci bersih & tiriskan"}, {id:2, description:"Siapkan bumbu, haluskan"}, {id:3, description:"Dalam wajan masak bumbu sampai airnya kering (air ini krn bumbunya aku blender jd berair) kmdn tambahkan minyak & tumis hingga bumbu matang"}, {id:4, description:"Masukkan terasi, gula merah, gula pasir (boleh skip kalau ga suka manis) & garam,aduk rata. Masukkan ayam, aduk rata & masak hingga ayam kaku/berubah warna."}, {id:5, description:"Tambahkan santan. Aduk rata & masak hingga ayam empuk - santan menyusut"}, {id:6, description:"Koreksi rasanya. Kalau sdh pas manis gurihnya matikan api"}, {id:7, description:"Pisahkan ayam dr bumbunya, bakar sebentar sambil dioles2 bumbu, bolak balik... Angkat & hidangkan."}, {id:8, description:"Untuk lauk makan siang bersama urap sayur, alhamdulillah muantaapp... 😋 Pak Boss lekooh maemnya"}]);
    arrData[1][recipeField.entity.preparationTime.name] = "30 menit";
    arrData[1][recipeField.entity.cookTime.name] = "1 jam";
    arrData[1][recipeField.entity.serving.name] = 5;
    arrData[1][recipeField.entity.cuisine.name] = "Asia Indonesia";
    arrData[1][recipeField.entity.category.name] = "Chicken";
    arrData[1][recipeField.entity.difficultyLevel.name] = "medium";
    arrData[1][recipeField.entity.photoName.name] = "";
    arrData[1][recipeField.entity.videoUrl.name] = "";
    arrData[1][recipeField.entity.createdAt.name] = moment().format('YYYY-MM-DD HH:mm:ss');
    arrData[1][recipeField.entity.updatedAt.name] = moment().format('YYYY-MM-DD HH:mm:ss');

    return queryInterface.bulkInsert(recipeField.tableName, arrData);
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
