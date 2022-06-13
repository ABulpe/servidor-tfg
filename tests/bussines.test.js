const moongose = require('mongoose');
const Bussines = require('../models/Bussines')
const {api, initialBussines, getBussines} =require ('./helpers')


beforeEach(async ()=>{
    await Bussines.deleteMany({})
    
    for (const bussines of initialBussines) {
        bussinesObject = new Bussines(bussines)
        await bussinesObject.save()
      }

})

describe('Get all Bussines', ()=>{
    test("Bussines are resturned as json", async ()=>{
     
        await api
        .get('/api/bussines')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        
       
    })

    test('there are two bussines', async () => {
        const response = await api.get('/api/bussines')
        expect(response.body).toHaveLength(initialBussines.length)
        
        
    })

})

describe('Create a bussines', async ()=>{
    test('create a bussines', async () => {
        const newBussines = {
            bussinesName: 'name test',
            imageUrl: 'image test',
            description: 'description test',
            streetAddress: 'street address test',
            streetNumber: 'street number test',
            postalCode: 'postal code test',
            latitude: 'latitude test',
            longitude: 'longitude test',
            email: 'email test',
            mobile: 'mobile test',
            phone: 'phone test',
            instagram: 'instagram test',
            facebook: 'facebook test',
            twitter: 'twitter test',
        }

        await api
            .post('/api/bussines')
            .send(newBussines)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    test('a bussines can be deleted', async() =>{
        const bussines = getBussines()
         await api
            .delete(`/api/bussines/${bussines[0].id}`)
            expect(204)
    })
})

afterAll(()=>{
    moongose.connection.close()
    
})