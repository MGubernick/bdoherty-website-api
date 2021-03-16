const express = require('express')
const passport = require('passport')
// create a router so our code is more modular
const router = express.Router()
// require movie model
const Item = require('./../models/item.js')
// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')
// require the handle404 middleware, to handle not finding documents
const handle404 = require('./../../lib/custom_errors')
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership
// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', { session: false })

// CREATE An Item
// POST /items

router.post('/items', requireToken, (req, res, next) => {
  // extract the recipe from the incoming request's data (req.body)
  const itemData = req.body.item
  // add user as a recipe owner
  itemData.owner = req.user._id
  // create a recipe using the recipeData
  Item.create(itemData)
    .then(item => {
      res.status(201).json({ item: item })
    })
    .catch(next)
})

// IDEX All Items
// GET /items/all

router.get('/items/all', requireToken, (req, res, next) => {
  Item.find()
    .populate('owner', '_id email userName')
    .then(item => {
      res.status(200).json({ item: item })
    })
    .catch(next)
})

// INDEX for Sold recipes
// GET /items/sold

router.get('/items/sold', requireToken, (req, res, next) => {
  // find the recipes that coorilate with the specific owner
  Item.find()
  // populate the owner field with only the id and email
    .populate('owner', '_id email userName')
    .then(item => {
      res.status(200).json({ item: item })
    })
    .catch(next)
})

// SHOW (one item - will then allow update/delete)
// GET /items/:id

router.get('/items/:id', requireToken, (req, res, next) => {
  // get the id
  const id = req.params.id
  // find the one recipe based on the id & owner (should only find recipes by this user)
  Item.findOne({ _id: id, owner: req.user._id })
  // populate the owner field with the id and email only
    .populate('owner', '_id email userName')
    // handle any 404 erros
    .then(handle404)

    .then(item => {
      requireOwnership(req, item)
      res.status(200).json({ item: item })
    })
    .catch(next)
})

// SHOW (one item - will not allow update)
// GET/items/sale/:id
router.get('/recipes/sale/:id', requireToken, (req, res, next) => {
  // get the id
  const id = req.params.id
  // find the one recipe based on the id & owner (should only find recipes by this user)
  Item.findOne({ _id: id })
  // populate the owner field with the id and email only
    .populate('owner', '_id email userName')
    // handle any 404 erros
    .then(handle404)

    .then(item => {
      res.status(200).json({ item: item })
    })
    .catch(next)
})

/// UPDATE post
// PATCH /items/:id
router.patch('/items/:id', requireToken, removeBlanks, (req, res, next) => {
  const itemData = req.body.item
  delete itemData.owner
  const itemId = req.params.id
  const userId = req.user._id
  Item.findOne({_id: itemId, owner: userId})
    .then(handle404)
    .then(item => {
      requireOwnership(req, item)
      return item.updateOne(itemData)
    })
    .then(() => res.status(200).json({ recipe: itemData }))
    .catch(next)
})

// DELETE
// DELETE /items/:id

router.delete('/items/:id', requireToken, (req, res, next) => {
  const itemId = req.params.id
  const userId = req.user._id
  Item.findOne({_id: itemId, owner: userId})
    .then(handle404)
    .then(item => {
      requireOwnership(req, item)
      return item.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
