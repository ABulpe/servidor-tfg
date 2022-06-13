const bussinesRouter = require('express').Router()
const userExtractor = require('../middleware/userExtractor')
const Bussines = require('../models/Bussines')
const User = require('../models/User')
const upload = require('../middleware/storage')

bussinesRouter.get('/', async (request, response) => {

    try {
        const bussines = await Bussines.find({})
        response.json(bussines)
    }
    catch (err) {
        next(err)
    }

})

bussinesRouter.get('/:id', async (request, response, next) => {
    try {
        const {id} = request.params
        const bussines = await Bussines.findById(id)
        if(bussines) return response.json(bussines)
    }
    catch (err) {
        next(err)
    }
})

bussinesRouter.put('/', userExtractor ,async (request, response, next) => {
    try {
        const {id} = request.params
        const info = request.body 

        const newBussinesInfo = {
            bussinesName : info.bussinesName,
            description : info.description,
            streetAddress : info.streetAddress,
        }

        

        const bussines = await Bussines.findByIdAndUpdate(id, newBussinesInfo,{new : true})
        response.json(bussines)
    
    }   
    catch (err) {
        next(err)
    }
})

bussinesRouter.delete('/:id', userExtractor ,async (request, response, next) => {
    const {id} = request.params
    const res = await Bussines.findByIdAndDelete(id)
    if (res === null) return response.sendStatus(404)
    response.status(204).end()
})

bussinesRouter.post('/', userExtractor, upload.single('image'),async (request, response, next) =>{
    const {
        bussinessName,
        description,
        streetAddress,
        streetNumber,
        postalCode,
        latitude,
        longitude,
        email,
        mobile,
        phone,
        instagram,
        twitter,
        facebook
    } = request.body

    const newBussinesInfo = new Bussines({
        bussinessName,
        description,
        streetAddress,
        streetNumber,
        postalCode,
        latitude,
        longitude,
        email,
        mobile,
        phone,
        instagram,
        twitter,
        facebook
    })

    const {filename} = request.file 
    newBussinesInfo.setImgUrl(filename)

    try{
        const savedBussines = await newBussinesInfo.save()
        response.json(savedBussines)
    }
    catch(err){
        next(err)
    }
})

module.exports = bussinesRouter