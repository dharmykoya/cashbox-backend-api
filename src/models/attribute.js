"use strict";
module.exports = (sequelize, DataTypes) => {
  const Attribute = sequelize.define(
    "Attribute",
    {
      hairColor: DataTypes.STRING,
      height: DataTypes.FLOAT,
      weight: DataTypes.FLOAT,
      job: DataTypes.STRING,
      peopleId: {
        type: DataTypes.INTEGER,
        allowNull: {
          args: false,
          references: {
            model: "People",
            key: "id",
            as: "Person"
          },
          unique: {
            args: true,
            msg: "Email already exists"
          }
        }
      }
    },
    {}
  );
  Attribute.associate = function(models) {
    // associations can be defined here
    Attribute.belongsTo(models.People, {
      foreignKey: "peopleId",
      as: "person",
      onDelete: "CASCADE"
    });
  };
  return Attribute;
};
