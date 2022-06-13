const {Schema, model} = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new Schema({

    passwordHash:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname:
    {
        type: String,
        required: true
    },
    email:
    {
        type: String,
        required: true,
        unique : true
    },
    role:
    {
        type: Number,
        required: true
    },
    association: {
        type: Schema.Types.ObjectId,
        ref: "Association",
        required: true
    }
    
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id
      delete returnedObject._id
      delete returnedObject.__v
  
      delete returnedObject.passwordHash
    }
  })
  
  userSchema.plugin(uniqueValidator)
  
  const User = model('User', userSchema)
  
  module.exports = User
  