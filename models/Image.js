const {Schema, model} = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const imageSchema = new Schema({

    imageUrl : {
        type : String,
        required: true
    },

    created_at: {
        type: Date,
    },

    updated_at: {
        type: Date,
    },

    association: {
        type : Schema.Types.ObjectId,
        ref: "Association",
        required: true
    }


})

imageSchema.set('toJSON',{
    transform: (document, returnedObject) =>{
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

imageSchema.methods.setImgUrl = function setImgUrl(filename){
    
    const host = process.env.APP_HOST 
    const port = process.env.PORT
    this.imageUrl = `${host}:${port}/public/${filename}`   
}

imageSchema.plugin(uniqueValidator)

const Image = model("Image", imageSchema)

module.exports = Image
