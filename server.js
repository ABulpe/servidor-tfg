require ('dotenv').config()
require ('./config/database')
//Imports
const Database = require('./config/database')
const App = require('./app')




Database.connect()


const PORT = process.env.PORT || 3001
App.listen(PORT, (error)=>{
    if(error) return console.log(error)
    console.log(`Server running on port ${PORT}`)
})

