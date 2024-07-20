const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { createCategoryController, getCategoriesController, updateCategoryController, deleteCategoryController } = require('../controllers/categoryController');


const categoryRouter = express.Router();

categoryRouter.post('/create', authMiddleware, createCategoryController);
categoryRouter.get('/get', authMiddleware, getCategoriesController);
categoryRouter.put('/update/:id', authMiddleware, updateCategoryController);
categoryRouter.delete('/delete/:id', authMiddleware, deleteCategoryController);

module.exports = categoryRouter;
