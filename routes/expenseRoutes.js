const express = require('express');
const { createExpenseController, getExpenseController, updateExpenseController, deleteExpenseController } = require('../controllers/expenseController');
const authMiddleware = require('../middleware/authMiddleware');

const expenseRouter = express.Router();


expenseRouter.post('/create', authMiddleware, createExpenseController);
expenseRouter.get('/get', authMiddleware, getExpenseController);
expenseRouter.put('/update/:id', authMiddleware, updateExpenseController);
expenseRouter.delete('/delete/:id', authMiddleware, deleteExpenseController);

module.exports = expenseRouter;
