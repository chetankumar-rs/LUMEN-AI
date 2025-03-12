import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';  
import connectDB from './config/db.js';   
import authRouter from './Routes/auth.js';   

dotenv.config();   

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
    res.json({ result: "hi there" });
});

const PORT = process.env.PORT || 5000;   
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
