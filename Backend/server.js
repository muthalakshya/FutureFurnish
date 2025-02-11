import express, {json} from 'express';
import "dotenv/config"
import cors from 'cors'
import  connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/useRoute.js'


const app = express();
const port = process.env.PORT || 4000;

connectDB()
connectCloudinary()

app.use(express.json())
app.use(cors())

app.use('/api/user',userRouter)

app.get('/',(req,res)=>{
    res.send("Running at port 4000")
})

app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
})