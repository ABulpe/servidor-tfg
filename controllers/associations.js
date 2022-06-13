const associationsRouter = require('express').Router()
const userExtractor = require('../middleware/userExtractor')
const Association = require('../models/Association')
const User = require('../models/User')
const upload = require('../middleware/storage')

associationsRouter.get("/", async (request,response, next)=>{
    try{
    
        const associations = await Association.find({})
        .populate("user")
        .populate("news")
        

        response.json(associations)
    }
    catch(err){
        next(err)
    }
       
})

associationsRouter.get("/:id", async (request,response, next)=>{
    try{
        const {id} = request.params
        const association = await Association.findById(id)
            .populate("news")
            .populate("image")
        if(association) return response.json(association)
        

    }
    catch(err){
        next(err)
    }

})

associationsRouter.put("/", userExtractor ,async (request, response, next) => {
    try {
        const {id} = request.params
        const {info} = request.body

        const newAssociationInfo = {
            name: info.name,
            description: info.description,
            streetAddress: info.streetAddress,
            streetNumber: info.streetNumber,
            postalCode: info.postalCode,
        }
        

       const association =  await Association.findByIdAndUpdate(id, newAssociationInfo, {new : true})
       
       response.json(association)


    }catch{
        next(err)
    }
})

associationsRouter.delete("/:id", userExtractor, async (request, response, next) => {
    const {id} = request.params
    
    const res = await Association.findByIdAndDelete(id)

    if(res === null) return response.sendStatus(404)

    response.status(204).end()

})

associationsRouter.post("/" , upload.single('image'), async (request, response, next) => {
    
    const {
        name,
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

    
    const newAssociationInfo = new Association({
        name,
        description,
        streetAddress,
        postalCode,
        streetNumber,
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
    newAssociationInfo.setImgUrl(filename)

    try {
        const savedAssociation = await newAssociationInfo.save()
        response.json(savedAssociation)
    }
    catch(err){
        next(err)
    }  
})

module.exports = associationsRouter