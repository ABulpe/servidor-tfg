const bcrypt = require('bcrypt')
const { response } = require('express')
const { RegisterUser } = require('moongose/controller/user_controller')
const userExtractor = require('../middleware/userExtractor')
const usersRouter = require('express').Router()
const User = require('../models/User')
const Association = require('../models/Association')

usersRouter.get('/', async (request, response, next) => {
    try {
        const users = await User.find({})
        .populate('association')
        response.json(users)
    }
    catch (err) {
        next(err)
    }
})

usersRouter.get('/', async (request, response,next) => {
    try{
        const {id} = request.params
        const user = await User.findById(id)
        if(user) return response.json(user)
    }
    catch (err) {
        next(err)
    }
})

usersRouter.put("/", userExtractor, async (request, response, next) => {
    try{
        const {id} = request.params
        const user = await User.findById(id)
        if(user) return response.json(user)
    }
    catch (err) {
        next(err)
    }
})

usersRouter.delete("/:id", async (request, response) => {
    const {id} = request.params
    const res = await User.findByIdAndDelete(id)
    if(res === null) return response.sendStatus(404)

    response.status(204).end()
})

usersRouter.post('/',async (request,response,next) => {
    const {body} = request
    const {name, surname, email, association, password, role } = body

    const saltRounds = 10 
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const findAssociation = await Association.findById(association) 

    const user = new User({
        
        passwordHash,
        name,
        surname,
        email,
        role,
        association: findAssociation._id
    })
    try{
        const savedUser = await user.save()
        response.status(201).json(savedUser)
        findAssociation.user  = findAssociation.user.concat(savedUser._id)
        await findAssociation.save()
        
    }catch(e){
        next(e)
    }
    
    

           
   

})

module.exports = usersRouter