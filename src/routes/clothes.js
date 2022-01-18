'use strict';

const express = require('express');
const { ClothesModel } = require('../models');

const router = express.Router(); // gives us an object to define routing logic



router.get('/clothes', read); // return all clothes
router.get('/clothes/:id', read); // return clothes matching id

router.post('/clothes', create); // create new clothes
router.put('/clothes', update); // update clothes
router.delete('/clothes', remove); // delete clothes

async function read(req, res, next) {
  console.log('Reading your grocery list.');

  let { id } = req.params;
  let clothes;
  if (id) {
    clothes = await ClothesModel.findOne({where: {id}});
  } else {
    clothes = await ClothesModel.findAll();
  }


  let resObject ={
    count: clothes ? clothes.length : 1,
    results: clothes,
  };
  res.status(200).json(resObject);
}

async function create(req, res, next) {
  const newClothesModel = { ...req.body };
  const postClothes = await ClothesModel.create(newClothesModel);
  res.status(201).send(postClothes);
}

async function update(req, res, next) {
  const id = req.params.id;
  const updatedData = { ...req.body };
  const updatedClothes = await ClothesModel.findByIdAndUpdate(id, updatedData, { new:true, overwrite: true});
  res.status(200).send(updatedClothes);
}

async function remove(req, res, next) {
  const id = req.params.id;
  const deletedClothes = await ClothesModel.findOne({ _id: id });
  if (deletedClothes) {
    await ClothesModel.findByIdAndDelete(id);
    res.status(200).send('Clothes has been ${} deleted');
  } else {
    res.status(404).send('Clothes ${} was not deleted.');
  }
}

module.exports = router;