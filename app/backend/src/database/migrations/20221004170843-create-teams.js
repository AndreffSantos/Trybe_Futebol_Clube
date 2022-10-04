'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  await queryInterface.createTable('teams', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    teamName: {
      field: 'team_name',
      type: Sequelize.STRING,
    },
  });
},

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('teams');
  }
};
