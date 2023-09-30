const express = require('express');
const app = express()
require('dotenv').config()
app.use(express.urlencoded({extended:false}))
const adminRouter = require('./router/adminRouter')
const userRouter = require('./router/userRouter');
const mongoose = require('mongoose');
mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)
const Session = require('express-session');


app.use(Session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))
app.use('/admin',adminRouter)
app.use(userRouter)
app.use(express.static('public'))
app.set('view engine','ejs')
app.listen(process.env.PORT,()=>{console.log(`Server is running on Port No. ${process.env.PORT}`);})