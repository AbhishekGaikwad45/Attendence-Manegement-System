const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const studentRoutes = require('./routes/student');
const attendanceRoutes = require('./routes/attendance');
const authRoutes = require('./routes/auth');

const cors=require('cors')
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cors())
app.use('/api/auth', authRoutes);

app.use('/api/students', studentRoutes);
app.use('/api/attendance', attendanceRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
