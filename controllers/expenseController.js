const expenseModel = require("../models/expenseModel")

const createExpenseController = async(req, res) => {
    // res.status(201).send({message: "Expense is Created", success: false })
    try {
        const { userId, date, amount, category, description } = req.body;
        // Validate request body
        if (!userId || !date || !amount || !category || !description) {
            return res.status(400).send({ message: "Missing required fields", success: false });
        }
        // console.log("Expense added data:", { userId, date, amount, category, description });
        const newExpense = await new expenseModel({
            userId,
            date,
            amount,
            category,
            description
        });

        await newExpense.save();
        // res.status(201).json(newExpense);
        res.status(201).send({ message: "Expense created successfully", success: true, newExpense });
    } 
    catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error", success: false, error: error.message });
    }
}

const getExpenseController = async(req, res) => {
    // res.status(201).send({message: "Expense is Getting", success: false })
    try {
        // const expenses = await expenseModel.find({ userId: req.userId._id });
        const expenses = await expenseModel.find({});
        res.status(200).json({ message: "Expenses are successfully fetched", success: true, expenses });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error", success: false, error: error.message });
    }
}

const updateExpenseController = async(req, res) => {
    // res.status(201).send({message: "Expense is Updated", success: false })
    try {
        const { id } = req.params;
        const updatedExpense = await expenseModel.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({message: "Expense is Updated", success: true, updatedExpense });
    } 
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error", success: false, error: error.message });
    }

}

const deleteExpenseController = async(req, res) => {
    // res.status(201).send({message: "Expense is Deleted", success: false })
    try {
        const { id } = req.params;
        await expenseModel.findByIdAndDelete(id);
        res.status(200).send({ message: "Expense deleted successfully", success: true });
    } 
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error", success: false, error: error.message });
    }
}


module.exports = { createExpenseController, getExpenseController, updateExpenseController, deleteExpenseController }