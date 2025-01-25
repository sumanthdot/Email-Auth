import express from 'express';
import cors from 'cors'
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js'
// import connectDB from './config/mongodb.js';
import { authRouter } from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import path from 'path'

const app = express();
const port = process.env.PORT || 8000
connectDB()
const _dirname= path.resolve()

const allowedOrigins = ['https://authportal-b34r.onrender.com']
// const allowedOrigins = ['http://localhost:5173']



app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:allowedOrigins,  credentials:true}));

// API ENDPOINT
// app.get('/',(req,res)=>{res.send("API working")})
app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);


app.use(express.static(path.join(_dirname, "/client/dist")));
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
 });



app.listen(port,()=>{
    console.log(`server started on PORT: ${port}`)
});

