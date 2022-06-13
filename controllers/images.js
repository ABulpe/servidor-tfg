const imagesRouter = require('express').Router()
const userExtractor = require('../middleware/userExtractor')
const Image = require('../models/Image')
const Association = require('../models/Association')
const upload = require('../middleware/storage')


imagesRouter.get("/", async (request, response, next) => 
{
    try
    {
        const images = await Image.find({})
        response.json(images)        
    }
    catch(err)
    {
        next(err)
    }
})

imagesRouter.get('/:id', async (request, response, next) => 
{   
    try
    {
        const {id} = request.params
        const image = await Image.findById(id)

        if (image) return response.json(image)
    }

    catch(err)
    {
        next(err)
    }

})

imagesRouter.put("/", userExtractor,async(request, response, next) =>
{
    try
    {
        const {id} = request.params

        const newImageInfo = 
        {
            
            updated_at: new Date()

        }
        
        const image = await Image.findByIdAndUpdate(id, newImageInfo, {new : true})

        response.json(image)
    }
    catch(err)
    {
        next(err)
    }
})

imagesRouter.delete("/:id",userExtractor,async (request,response, next) =>
{
    const {id} = request.params
    const res = await Image.findByIdAndDelete(id)
    if (res === null) return response.sendStatus(404)
    response.status(204).end()
})

imagesRouter.post("/", userExtractor, upload.single('image'), async (request,response, next) =>{

    const {body} = request
    const {association} = body

    const findAssociation = await Association.findById(association)

    const newImageInfo = new Image ({
        created_at: new Date(),
        updated_at: new Date(),
        association: findAssociation._id
    })

    const {filename} = request.file
    newImageInfo.setImgUrl(filename)
  
    
    try 
    {
        const savedImage = await newImageInfo.save()
        response.status(201).json(savedImage)
        findAssociation.image  = findAssociation.image.concat(savedImage._id)
        await findAssociation.save()
        
    }
    catch (err)
    {
        next(err)
    }

})

module.exports = imagesRouter