const express = require('express');
const CategoryController = require("./controllers/CategoryController");

const router = express.Router();

router.get('/categories',CategoryController.index);
router.post('/categories',CategoryController.store);
router.patch('/category/:category',CategoryController.update);
router.delete('/category/:category',CategoryController.destroy);

module.exports = router;