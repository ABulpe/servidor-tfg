const {Schema,model} = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const newsSchema = new Schema({

    title: {
        type : String,
        unique : true,
        required : true
    },

    imageUrl: {
        type : String,
        required : true
    },

    content: {
        type : String,
        required : true
    },

    date: {
        type : Date
    },

    created_at: {
        type : Date,
    },

    updated_at:{
        type : Date,
    },

    author: {
        type : String,
        required : true
    },

    association: {
        type : Schema.Types.ObjectId,
        ref: "Association",
        required: true
    }

  
})

newsSchema.set('toJSON',{
    transform: (document, returnedObject) =>{
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

newsSchema.methods.setImgUrl = function setImgUrl(filename){
    
    const host = process.env.APP_HOST 
    const port = process.env.PORT
    this.imageUrl = `${host}:${port}/public/${filename}`   
}


newsSchema.plugin(uniqueValidator)

const News = model('News', newsSchema)

module.exports = News   
