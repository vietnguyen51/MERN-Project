const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes/index');

const app = express();

// Thiết lập CORS
app.use(cors({
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Định nghĩa route API
app.use("/api", router);

// Kết nối với MongoDB và khởi chạy server
connectDB().then(() => {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log("Connected to DB");
        console.log("Server is running on port " + PORT);
    });
});
