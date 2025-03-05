import express, {json} from 'express';
import "dotenv/config"
import cors from 'cors'
import  connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/useRoute.js'
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import product3dRouter from './routes/product3dRoute.js';
import product3dUploadRouter from './routes/productUpload3dRoute.js';

const app = express();
const port = process.env.PORT || 4000;

connectDB()
connectCloudinary()

// app.use(express.json())
app.use(cors())
app.use(express.json({ limit: "500mb" })); // Default is 100kb, increase to 50MB
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)
app.use('/api/user3d',product3dRouter)
app.use("/api/product3model", product3dUploadRouter)

app.get('/',(req,res)=>{
    res.send("Running at port 4000")
})

app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
})