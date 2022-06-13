const mongoose = require('mongoose');
require('dotenv').config()


// Variables de entorno 
const {MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV} = process.env
//Conexion a base de datos
const connectionSting = NODE_ENV === 'test'
? MONGO_DB_URI_TEST 
: MONGO_DB_URI
console.log("Database:",connectionSting)
module.exports = {
    connection: null,
    connect: function(){
        if(this.connection) return this.connection
        return mongoose.connect(connectionSting)
            .then((connection)=>{
                this.connection = connection;
                console.log("Database connected")
            })
            .catch(err => {
                console.log(err);
            })
        
              
    }
}

process.on('uncaughtException', error => {
    console.error(error)
    // mongoose.disconnect()
    
  })
