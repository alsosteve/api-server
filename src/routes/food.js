'use strict';

const express = require('express');
const { FoodCollection } = require('../models');

const router = express.Router(); // gives us an object to define routing logic



router.get('/food', read); // return all food
router.get('/food/:id', read); // return food matching id

router.post('/food', create); // create new food
router.put('/food', update); // update food
router.delete('/food', remove); // delete food

async function read(req, res) {
  // console.log('Reading your grocery list.');

  // let { id } = req.params;
  // let food;
  // if (id) {
  //   food = await FoodModel.findOne({where: {id}});
  // } else {
  //   food = await FoodModel.findAll();
  // }


  // let resObject ={
  //   count: food ? food.length : 1,
  //   results: food,
  // };
  // res.status(200).json(resObject);
  if (req.params.id) {
    let food = await FoodCollection.read(req.params.id);
    res.status(200).send(food);
  } else {
    let food = await FoodCollection.create(req.body);
    res.status(201).send(food);
  }
}

async function create(req, res) {
  // const newFoodModel = { ...req.body };
  // const postFood = await FoodModel.create(newFoodModel);
  // res.status(201).send(postFood);
  let food = await FoodCollection.create(req.body);
  res.status(201).send(food);
}

async function update(req, res) {
  // const id = req.params.id;
  // const updatedData = { ...req.body };
  // const updatedFood = await FoodModel.findByIdAndUpdate(id, updatedData, { new:true, overwrite: true});
  // res.status(200).send(updatedFood);
  let food = await FoodCollection.update(req.params.id, req.body);
  res.status(200).send(food);
}

async function remove(req, res) {
  // const id = req.params.id;
  // const deletedFood = await FoodModel.findOne({ _id: id });
  // if (deletedFood) {
  //   await FoodModel.findByIdAndDelete(id);
  //   res.status(200).send('Food has been ${} deleted');
  // } else {
  //   res.status(404).send('Food ${} was not deleted.');
  // }
  let food = await FoodCollection.remove(req.params.id);
  res.status(204).send(food);
}

module.exports = router;