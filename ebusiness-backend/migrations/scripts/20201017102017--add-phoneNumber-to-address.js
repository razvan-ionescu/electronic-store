'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('addresses', 'phoneNumber', {
        type: Sequelize.STRING,
        allowNull: true
      });
  }
};
