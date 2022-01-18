'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory';


const foodSchema = require('./food.schema.js');
const clothesSchema = require('./clothes.schema.js');

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
const ClothesModel = clothesSchema(db, DataTypes);

module.exports = {
  db,
  FoodModel,
  ClothesModel,
};