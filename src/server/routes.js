const express = require('express');
const CategoryController = require("./controllers/CategoryController");
const ItemController = require('./controllers/ItemController');

const router = express.Router();

router.get('/categories',CategoryController.index);
router.post('/categories',CategoryController.store);
router.patch('/category/:category',CategoryController.update);
router.delete('/category/:category',CategoryController.destroy);

router.get('/items',ItemController.index);
router.post('/items',ItemController.store);
router.patch('/item/:item',ItemController.update);
router.delete('/item/:item',ItemController.destroy);

module.exports = router;