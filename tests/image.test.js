const moongose = require('mongoose');
const Image = require('../models/Image')
const {api, initialImages, getNews} =require ('./helpers')


beforeEach(async ()=>{
    await Image.deleteMany({})
    
    for (const image of initialImages) {
        imagesObject = new Image(image)
        await imagesObject.save()
      }

})

describe('Get all Images', ()=>{
    test("Image are resturned as json", async ()=>{
     
        await api
        .get('/api/images')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        
       
    })

    test('there are two image', async () => {
        const response = await api.get('/api/images')
        expect(response.body).toHaveLength(initialNews.length)
        
        
    })

})

describe('Create a image', async ()=>{
    test('create a image', async () => {
        const newImage = {
            imageUrl: "test",
            created_at: "test",
            updated_at: "test",
        }

        await api
            .post('/api/images')
            .send(newImage)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    test('a news can be deleted', async() =>{
        const images = getImages()
         await api
            .delete(`/api/images/${images[0].id}`)
            expect(204)
    })
})

afterAll(()=>{
    moongose.connection.close()
    
})