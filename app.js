//Imports
const express = require('express')
const cors = require('cors')
require ('dotenv').config()
require ('./config/database')
const usersRouter = require ('./controllers/users')
const loginRouter = require ('./controllers/login')
const bussinesRouter = require ('./controllers/bussines')
const newsRouter = require ('./controllers/news')
const imagesRouter = require ('./controllers/images')
const associationsRouter = require ('./controllers/associations')
const notFound = require ('./middleware/notFound')

//Creamos aplicación con express
const app = express()
app.use(cors())
app.use(express.json())


app.use('/public', express.static(`${__dirname}/storage/images`))
app.use("/api/images", imagesRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/bussines", bussinesRouter);
app.use("/api/news", newsRouter);
app.use("/api/associations", associationsRouter);



module.exports = app;