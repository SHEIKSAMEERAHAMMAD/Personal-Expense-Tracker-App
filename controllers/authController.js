const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const jwt = require("jsonwebtoken");


const registerController = async (req, res, next) => {
    try {
        const { name, email, password, confirmPassword, tc } = req.body;
        const { filename: image } = req.file;

        if (!name || !email || !password || !confirmPassword || !image || !tc) {
            return res.status(400).send({ message: "All fields are required", success: false });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: "User already exists, please login", success: false });
        }

        if (password !== confirmPassword) {
            return res.status(400).send({ message: "Passwords do not match", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            image,
            tc
        });

        await newUser.save();

        res.status(201).send({ message: "Registration successful", success: true });
    } catch (error) {
        console.error("Error in registerController:", error);
        next(error);
    }
};

const loginController = async(req, res) => {
    // res.send("Login Successfully")
    const { email, password } = req.body
    try {
        const existingUser = await userModel.findOne({email})
        if(!email || !password) {
            return res.status(400).send({ message: "Please enter email and password", success: false })
        }
        if(existingUser) {
            const isMatched = await bcrypt.compare(password, existingUser.password);
            console.log(isMatched);
            if(!isMatched) {
                res.status(400).send({ message: "Password or email are not matched", success: false })
            }
            else {
                const userId = existingUser._id
                let token = jwt.sign( { userId }, process.env.JWT_SECRET_KEY, { expiresIn: "7d"})
                res.cookie("auth_token", token, {maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true })
                // return res.status(200).send({ token })
                return res.status(200).send({ message: "Logged in successfully", success: true})
            }
        }
        else{
            return res.status(401).send({message: "User not found, Please register", success: false})
        }
    }
    catch(error) {
        console.error("Error in loginController:", error);
        res.status(500).send({ message: "Internal Server Error", success: false })
    }
}

const logoutController = async(req, res) => {
    try {
        res.clearCookie("auth_token")
        return res.status(200).send({ message: "Logout Successfull" }) 
    }
    catch(error) {
        console.log(error);
        return res.status(500).send({ error: "Something Went Wrong", errMsg: error.message })
    }
}


const getUserController = async(req, res) => {
    try {
        const {userId} = req
        // console.log("userId",userId);
        let userDetails = await userModel.findById(userId).select("-_id -password -__v")
        if(!userDetails) {
            return res.status(404).send({ message: "User not found", success: false });
        }
        else return res.status(200).send(userDetails)
    }
    catch(error) {
        console.error("Error in getUser:", error);
        return  res.status(500).send({message: "Something went to wrong", success: false})
    }
  }

const updateUserController = async (req, res) => {
    try {
        const userId = req.userId
        const data = req.body
        const updatedUser = await userModel.findByIdAndUpdate(userId, { $set: { ...data } }, { new: true }).select("-_id -password -__v")
        if(!updatedUser) {
            return res.status(404).send({ message: "User not found", success: false });
        }
        return res.status(200).send({ message: "User Details Updated", userData: { response: updatedUser } });
    }
    catch (error) {
        console.error("Error in updateUser:", error);
        return res.status(500).send({ error: "Something went wrong", errorMsg: err.message })
    }
}


const deleteUserController = async (req, res) => {
    try {
        const userId = req.userId
        await userModel.findByIdAndDelete(userId)
        res.clearCookie("auth_token")
        return res.status(200).send({ message: "User Deleted" })
    } 
    catch (error) {
        console.error("Error in deleteUser:", error);
        return res.status(500).send({ error: "Something went wrong", errorMsg: err.message })
    }
}

module.exports = { registerController, loginController, logoutController, getUserController, updateUserController, deleteUserController };
