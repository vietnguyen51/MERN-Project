const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config(); // Load biến môi trường từ file .env
const connectDB = require('./config/db'); // Hàm kết nối với MongoDB
const router = require('./routes/index'); // Import router

const app = express();
const BSON = require('bson');
console.log(BSON);

// Thiết lập CORS
// Đảm bảo CORS middleware đứng trước router
app.use(cors({
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // Đảm bảo OPTIONS được liệt kê
    credentials: true,
}));

app.use(express.json()); // Middleware để parse JSON
app.use(cookieParser()); // Middleware để parse Cookie

// Định nghĩa route API
app.use("/api", router);

// Kết nối với MongoDB và khởi chạy server
connectDB().then(() => {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log("Connected to DB");
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch((error) => {
    console.error('Failed to connect to DB:', error);
    process.exit(1); // Thoát nếu không thể kết nối
});
