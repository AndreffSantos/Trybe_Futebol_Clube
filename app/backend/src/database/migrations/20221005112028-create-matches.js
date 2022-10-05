'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      home_team: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: 'teams',
          key: 'id',
        },
      },
      home_team_goals: Sequelize.INTEGER,
      away_team: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: 'teams',
          key: 'id',
        },
      },
      away_team_goals: Sequelize.INTEGER,
      in_progress: Sequelize.BOOLEAN,
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('matchas');
  }
};
