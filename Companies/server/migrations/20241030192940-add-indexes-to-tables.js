"use strict";

// migrations/YYYYMMDDHHMMSS-add-indexes-to-tables.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Agregar índices en la tabla Company
    await queryInterface.addIndex("Companies", ["name"], { unique: true });
    await queryInterface.addIndex("Companies", ["industries"]);
    await queryInterface.addIndex("Companies", ["headquartersLocation"]);

    // Agregar índices en la tabla Score
    await queryInterface.addIndex("Score", ["marketSize"]);
    await queryInterface.addIndex("Score", ["innovationLevel"]);
    await queryInterface.addIndex("Score", ["companyId"]);

    // Agregar índices en la tabla Explanation
    await queryInterface.addIndex("Explanation", ["marketSize"]);
    await queryInterface.addIndex("Explanation", ["industryRelevance"]);
    await queryInterface.addIndex("Explanation", ["companyId"]);
  },

  down: async (queryInterface, Sequelize) => {
    // Elimina los índices si es necesario revertir la migración
    await queryInterface.removeIndex("Companies", ["name"]);
    await queryInterface.removeIndex("Companies", ["industries"]);
    await queryInterface.removeIndex("Companies", ["headquartersLocation"]);

    await queryInterface.removeIndex("Score", ["marketSize"]);
    await queryInterface.removeIndex("Score", ["innovationLevel"]);
    await queryInterface.removeIndex("Score", ["companyId"]);

    await queryInterface.removeIndex("Explanation", ["marketSize"]);
    await queryInterface.removeIndex("Explanation", ["industryRelevance"]);
    await queryInterface.removeIndex("Explanation", ["companyId"]);
  },
};
