"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Attributes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      height: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      hairColor: {
        allowNull: false,
        type: Sequelize.STRING
      },
      weight: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      job: {
        allowNull: false,
        type: Sequelize.STRING
      },
      peopleId: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: {
          args: false,
          references: {
            model: "People",
            key: "id",
            as: "person"
          }
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Attributes");
  }
};
