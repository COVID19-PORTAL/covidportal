'use strict';
const population = [
  {
    province: "Jawa Barat",
    population: 48037600,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    province: "Jawa Timur",
    population: 39293000,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    province: "Jawa Tengah",
    population: 34257900,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    province: "Sumatera Utara",
    population: 14262100,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    province: "Banten",
    population: 12448200,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    province: "DKI Jakarta",
    population: 10374200,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    province: "Sulawesi Selatan",
    population: 8690300,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    province: "Lampung",
    population: 8690300,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    province: "Sumatera Selatan",
    population: 8267000,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    province: "Riau",
    population: 6657900,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    province: "Nusa Tenggara Timur",
    population: 5287300,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    province: "Aceh",
    population: 5189500,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    province: "Nusa Tenggara Barat",
    population: 4955600,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    province: "Kalimantan Barat",
    population: 4932500,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    province: "Bali",
    population: 4246500,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    province: "Kalimantan Selatan",
    population: 4119800,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    province: "DI Yogyakarta",
    population: 3762200,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    province: "Kalimantan Timur",
    population: 3575400,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    province: "Jambi",
    population: 3515000,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    province: "Papua",
    population: 3265200,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    province: "Sulawesi Tengah",
    population: 2966300,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    province: "Kalimantan Tengah",
    population: 2605300,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    province: "Sulawesi Tenggara",
    population: 2602400,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    province: "Sulawesi Utara",
    population: 2461000,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    province: "Kepulauan Riau",
    population: 2082700,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    province: "Bengkulu",
    population: 1934300,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    province: "Maluku",
    population: 1744700,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    province: "Kepulauan Bangka Belitung",
    population: 1430900,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    province: "Sulawesi Barat",
    population: 1331000,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    province: "Maluku Utara",
    population: 1209300,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    province: "Gorontalo",
    population: 1168200,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    province: "Papua Barat",
    population: 915400,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    province: "Kalimantan Utara",
    population: 691100,
    createdAt: new Date(),
    updatedAt: new Date()
  },
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Populations', population, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Populations', null, {})
  }
};
