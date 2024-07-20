const categoryModel = require("../models/categoryModel")

const createCategoryController = async(req, res) => {
    // res.status(201).send({message: "Categories is Created", success: false })
    try {
        const { userId, name } = req.body;
        if(!name) {
            return res.status(400).json({ message: "Category name is required", success: false });
        }
        console.log("category added data:", { userId, name });
        const newCategory = await new categoryModel({
            userId,
            name
        });
        
        await newCategory.save();
        res.status(201).json({message: "Categories is Created", success: true, newCategory});
    } 
    catch (error) {
        res.status(500).json({ message: "Categories is Deleted", success: false, error: error.message });
    }
}

const getCategoriesController = async(req, res) => {
    // res.status(201).send({message: "Categories is Getting", success: false })
    try {
        const categories = await categoryModel.find({});
        res.status(200).json(categories);
      } 
      catch (error) {
        res.status(400).json({ message: "Categories is Getting", success: false, error: error.message });
      }
}

const updateCategoryController = async(req, res) => {
    // res.status(201).send({message: "Categories is Updated", success: false })
    const { id } = req.params;
      try {
        const updateCategory = await categoryModel.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({message: "Catagory is Updated", success: true, updateCategory });
      } 
      catch (error) {
        res.status(400).json({ message: "Categories is Updated", success: false, error: error.message });
      }
}

const deleteCategoryController = async(req, res) => {
    // res.status(201).send({message: "Categories is Deleted", success: false })
    const { id } = req.params;
    try {
      await categoryModel.findByIdAndDelete(id);
      res.status(200).json({ message: 'Category deleted' });
    } catch (error) {
      res.status(400).json({ message: "Categories is Deleted", success: false, error: error.message });
    }  
}


module.exports = { createCategoryController, getCategoriesController, updateCategoryController, deleteCategoryController }