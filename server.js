const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./config/dbConnect");
const userRouter = require("./routes/authRoutes");
const path = require('path');
// const expenseRouter = require("./routes/expenseRoutes");
const cookieParser = require("cookie-parser");
const otpRouter = require("./routes/otpRoutes");
const expenseRouter = require("./routes/expenseRoutes");
const categoryRouter = require("./routes/categoryRoutes");


// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// middleware 
app.use(express.json());
app.use(cookieParser())

// Retrieve environment variables
const PORT = process.env.PORT || 4000;
const hostName = process.env.HOST_NAME || "127.0.0.4";


// Database Connection
dbConnect();


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// endpoints and define routes
app.use('/api/auth', userRouter);
app.use('/api/otp', otpRouter);

app.use('/api/expenses', expenseRouter);
app.use('/api/categories', categoryRouter);

//                    API Endpoints :
//  /api/auth/register           [POST] - Register a new user
//  /api/auth/login              [POST] - Login a user

//  /api/expenses/create         [POST] - Add expenses
//  /api/expenses/get            [GET] - Get expenses

//  /api/expenses/update/:id     [PUT] - Update an expense
//  /api/expenses/delete/:id     [DELETE] - Delete an expense

//  /api/categories/create       [POST] - Add categories
//  /api/categories/get          [GET] - Get categories

//  /api/categories/update/:id   [PUT] - Update a category
//  /api/categories/delete/:id   [DELETE] - Delete a category

// demo api
app.get("/", (req, res) => {
    res.send("<h1>Hello, I am Personal Expense Tracker API is running</h1>");
});

// Start server
app.listen(PORT, hostName, () => {
    console.log(`Server running at http://${hostName}:${PORT}`);
});