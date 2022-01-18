
'use strict';

const Basket = (sequelize, DataTypes) => sequelize.define('Basket', {
  Owner: {
    type: DataTypes.STRING,
  },
});

module.exports = Basket;