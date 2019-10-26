"use strict";
module.exports = (sequelize, DataTypes) => {
  const People = sequelize.define(
    "People",
    {
      firstName: DataTypes.STRING,
      surnName: DataTypes.STRING,
      dateOfBirth: DataTypes.DATEONLY,
      age: DataTypes.INTEGER
    },
    {}
  );
  People.associate = function(models) {
    // associations can be defined here
    People.hasOne(models.Attribute, {
      foreignKey: "peopleId",
      as: "attribute",
      onDelete: "CASCADE"
    });
  };
  return People;
};
