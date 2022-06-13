const {Schema,model} = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const associationSchema = new Schema({

    name: {
        type: String,
        unique: true,
        required: true
    },

    imageUrl: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true,
    },

    streetAddress: {
        type: String,
        required: true
    },

    postalCode: {
        type: Number,
        required: true
    },
    
    streetNumber: {
        type: String,
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

    user: [{
        type : Schema.Types.ObjectId,
        ref: "User"
    }],

    news: [{
        type : Schema.Types.ObjectId,
        ref: "News"
    }],

    image: [{
        type : Schema.Types.ObjectId,
        ref: "Image"
    }]
    
})

associationSchema.set("toJSON",{
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

associationSchema.methods.setImgUrl = function setImgUrl(filename){
    const host = process.env.APP_HOST 
    const port = process.env.PORT
    this.imageUrl = `${host}:${port}/public/${filename}`
}

associationSchema.plugin(uniqueValidator)

const Association = model("Association", associationSchema)

module.exports = Association