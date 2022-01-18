
'use strict';

const Food = (sequelize, DataTypes) => sequelize.define('Food', {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  food: {
    type: DataTypes.STRING,
  },
});

module.exports = Food;