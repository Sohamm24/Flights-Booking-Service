const express=require('express')
const {ServerConfig}=require('./config')
const apiRoutes=require('./routes') 
const  CRONS = require('./utils/common/cron-jobs')

const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api',apiRoutes)

app.listen(ServerConfig.PORT,async ()=>{
    console.log(`Sever Running on port :${ServerConfig.PORT}`) 
    CRONS();
})