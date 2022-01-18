'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory';

const Collection = require('./Collection.js');
const foodSchema = require('./food.schema.js');
const basketSchema = require('./basket.schema.js');

// typical connection string: postgresql://localhost:5432/food
let db = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
const FoodModel = foodSchema(db, DataTypes);
const BasketModel = basketSchema(db, DataTypes);

// create an association between 2 tables
BasketModel.hasMany(FoodModel, { foreignKey: 'basketId', sourceKey: 'id'}); 
FoodModel.belongsTo(BasketModel, { foreignKey: 'basketId', targetKey: 'id'});

module.exports = {
  db,
  FoodCollection: new Collection(FoodModel),
  BasketCollection: new Collection(BasketModel),
};