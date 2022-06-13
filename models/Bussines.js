const {Schema, model} = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const bussinesSchema = new Schema({

    bussinessName: {
        type: String,
        unique: false,
        required: true
    },

    imageUrl: {
        type: String,
        unique: false,
        required: true
    },

    description: {
        type: String,
        unique: false,
        required: true
    },

    streetAddress: {
        type: String,
        requirered: true
    },

    streetNumber: {
        type: String,
        required: true
    },

    postalCode: {
        type: Number,
        required: true
    },
    

    latitude: {
        type: String,
        unique: false,
        required: false
    },

    longitude: {
        type: String,
        unique: false,
        required: false
    },

    email: {
        type: String,
        unique: true
    },

    mobile: {
        type: String,
        unique: true
    },

    phone: {
        type: String,
        unique: true
    },

    instagram: {
        type: String,
        unique: true
    },

    facebook: {
        type: String,
        unique: true
    },

    twitter: {
        type: String,
        unique: true
    },

})

bussinesSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

bussinesSchema.methods.setImgUrl = function setImgUrl(filename){
    
    const host = process.env.APP_HOST 
    const port = process.env.PORT

    this.imageUrl = `${host}:${port}/public/${filename}`

    
}

bussinesSchema.plugin(uniqueValidator)

const Bussines = model("Bussines", bussinesSchema)

module.exports = Bussines