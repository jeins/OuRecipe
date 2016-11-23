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
    arrData[0][recipeField.entity.ingredients.name] = JSON.stringify(["1 ekor ayam kampung direbus", "1 sdm mentega", "1 sdm EVOO", "5 sdm kecap inggris", "2 sdm kecap inggris (utk marinated)", "1 sdm kecap manis", "2 sdm kikkoman sweet sou sauce", "1 siung bawang putih", "1/2 bawang bombay potong besar", "100 ml air", "1 buah jeruk limo", "Minyak goreng"]);
    arrData[0][recipeField.entity.steps.name] = JSON.stringify(["Marinated ayam yang sudah direbus dengan kecap inggris, diamkan di kulkas 1 malam (atau 30 menit)", "Goreng ayam yang sudah di marinated tadi hingga setengah garing, lalu sisihkan", "Di pan terpisah, masukan EVOO (atau bs diganti dengan minyak sayur lainnya) dan mentega, lalu tumis bawang bombay & bawang putih sampai harum", "Masukan kecap inggris, kecap sweet soy sauce kikkoman, kecap manis, tambahkan air sedikit atau selera... masak hinggs tercampur rata..", "Tambahan perasan jeruk limo di sauce pan, lalu masukan ayam yang sudah digoreng tadi... aduk2 dan Siap dihidangkan"]);
    arrData[0][recipeField.entity.preparationTime.name] = "30 menit";
    arrData[0][recipeField.entity.cookTime.name] = "1 jam";
    arrData[0][recipeField.entity.serving.name] = 5;
    arrData[0][recipeField.entity.cuisine.name] = "Asia Indonesia";
    arrData[0][recipeField.entity.category.name] = "Chicken";
    arrData[0][recipeField.entity.difficultyLevel.name] = 3;
    arrData[0][recipeField.entity.photoName.name] = "";
    arrData[0][recipeField.entity.videoUrl.name] = "";
    arrData[0][recipeField.entity.createdAt.name] = moment().format('YYYY-MM-DD HH:mm:ss');
    arrData[0][recipeField.entity.updatedAt.name] = moment().format('YYYY-MM-DD HH:mm:ss');

    arrData[1] = [];
    arrData[1][recipeField.entity.userId.name] = 2;
    arrData[1][recipeField.entity.title.name] = "Ayam goreng mentega";
    arrData[1][recipeField.entity.description.name] = "Dari kemarin kepingin ayam panggang tp ke pasar ga kebagian dapat ayam kampung, akhirnya hr ini alhamdulillah keturutan. Bumbunya ngawur suka2 kokinya hihihi.... yg penting enak, suami & nenek suka ";
    arrData[1][recipeField.entity.ingredients.name] = JSON.stringify(["1 ekor ayam kampung", "250 gr cabai merah besar", "12 siung bawang merah", "5 siung bawang putih", "2 ruas jari kunyit dibakar bersama kulitnya kmdn dikerok", "2 ruas jari jahe", "1 sdt terasi matang", "secukupnya gula merah", "secukupnya gula pasir & garam", "santan", "sdkt minyak goreng untuk menumis"]);
    arrData[1][recipeField.entity.steps.name] = JSON.stringify(["Siapkan ayam, potong mjd 4bagian besar. Lumuri dg air jeruk nipis & garam sambil agak digosok2, diamkan 10menit kmdn cuci bersih & tiriskan", "Siapkan bumbu, haluskan", "Dalam wajan masak bumbu sampai airnya kering (air ini krn bumbunya aku blender jd berair) kmdn tambahkan minyak & tumis hingga bumbu matang", "Masukkan terasi, gula merah, gula pasir (boleh skip kalau ga suka manis) & garam,aduk rata. Masukkan ayam, aduk rata & masak hingga ayam kaku/berubah warna.", "Tambahkan santan. Aduk rata & masak hingga ayam empuk - santan menyusut", "Koreksi rasanya. Kalau sdh pas manis gurihnya matikan api", "Pisahkan ayam dr bumbunya, bakar sebentar sambil dioles2 bumbu, bolak balik... Angkat & hidangkan.", "Untuk lauk makan siang bersama urap sayur, alhamdulillah muantaapp... 😋 Pak Boss lekooh maemnya"]);
    arrData[1][recipeField.entity.preparationTime.name] = "30 menit";
    arrData[1][recipeField.entity.cookTime.name] = "1 jam";
    arrData[1][recipeField.entity.serving.name] = 5;
    arrData[1][recipeField.entity.cuisine.name] = "Asia Indonesia";
    arrData[1][recipeField.entity.category.name] = "Chicken";
    arrData[1][recipeField.entity.difficultyLevel.name] = 3;
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
