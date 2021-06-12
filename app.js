import express from 'express'  
import bodyParser from 'body-parser' 
import logger from './midleware/logger.js' 
import userRoute from './components/user/controllers.js' 
import morgan from 'morgan'
import dotenv from 'dotenv'
import stockRoute from './components/stock/view.js'
dotenv.config()// it's secret!!!



const app = express();
app.disable('etag');
const port = process.env.PORT;
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port, ()=> {logger.info('server up 🥳')}) 
app.use(morgan("combined",{"stream":logger.stream})) //request logging

// // Creating Path for Routeing
const path =(path)=>`/NSE/${path}`

const userPath=path('user') 
const stockPath=path('stock') 
app.use(stockPath,stockRoute)


// //---Routing---
app.use(userPath,userRoute)




app.get('/',(req,res)=>{
    res.status(200).send("<h1>server is up</h1>")
})