import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/db.js'
import user from './routes/user.routes.js'
import admin from './routes/admin.routes.js'

dotenv.config();

const app = express()
const port = process.env.PORT

app.use(express.json())
connectDB()
app.get('/',(req,res)=>{
    res.json("New url")
})

app.use('/api/v1/user',user)
app.use('/api/v1/admin',admin)

app.listen(port,()=>{
  console.log(`Server is Running on PORT :${port}`);
  
})