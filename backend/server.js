import express from 'express'
import cors from 'cors'
import connectDB from './db/db';
import authRouter from './Routes/auth'
const app=express();
app.use(express.json());
app.use(cors());


connectDB();

app.use('/api/auth',authRouter);


app.get('/',(req,res)=>{


    res.json({
        result:"hi there "
    })
})

app.listen(3000);

