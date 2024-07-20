const express = require('express');
const { registerController, loginController, getUserController, deleteUserController, updateUserController } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require("../utils/multer")
const userRouter = express.Router();


// User registration route with file upload middleware
userRouter.post('/register', upload.single('image'), registerController);
userRouter.post("/login", loginController)

// User details access 
userRouter.get("/get-user", authMiddleware, getUserController)
userRouter.post("/update-user", authMiddleware, updateUserController)
userRouter.post("/delete-user", authMiddleware, deleteUserController)

module.exports = userRouter;
