'use strict';

const express = require('express');
const { BasketCollection } = require('../models');

const router = express.Router(); // gives us an object to define routing logic



router.get('/basket', read); // return all basket
router.get('/basket/:id', read); // return basket matching id

router.post('/basket', create); // create new basket
router.put('/basket', update); // update basket
router.delete('/basket', remove); // delete basket

async function read(req, res) {
  if (req.params.id) {
    let basket = await BasketCollection.read(req.params.id);
    res.status(200).send(basket);
  } else {
    let basket = await BasketCollection.create(req.body);
    res.status(201).send(basket);
  }
}

async function create(req, res) {let basket = await BasketCollection.create(req.body);
  res.status(201).send(basket);
}

async function update(req, res) {let basket = await BasketCollection.update(req.params.id, req.body);
  res.status(200).send(basket);
}

async function remove(req, res) {
  let basket = await BasketCollection.remove(req.params.id);
  res.status(204).send(basket);
}

module.exports = router;