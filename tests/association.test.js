const moongose = require('mongoose');
const Association = require('../models/Association')
const {api, initialAssociations, getAssociations} =require ('./helpers')


beforeEach(async ()=>{
    await Association.deleteMany({})
    
    for (const association of initialAssociations) {
        associationsObject = new Association(association)
        await associationsObject.save()
      }

})

describe('Get all Association', ()=>{
    test("Association are resturned as json", async ()=>{
     
        await api
        .get('/api/associations')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        
       
    })

    test('there are two associations', async () => {
        const response = await api.get('/api/associations')
        expect(response.body).toHaveLength(initialAssociations.length)
        
        
    })

})

describe('Create a association', async () =>{
    test('create a association', async () => {
        const newAssociation = {
            name: "test",
            imageUrl: "test",
            description: "test",
            streetAddress: "test",
            streetNumber: 7 ,
            postalCode: 11519,
            latitude: 1,
            longitude: 1,
            email: "test@example.com",
            mobile: "666555444",
            phone: "856777876",
            instagram: "test",
            facebook: "test",
            twitter: "test",
        }

        await api
            .post('/api/associations')
            .send(newAssociation)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    test('a association can be deleted', async() =>{
        const association = getAssociations()
         await api
            .delete(`/api/associations/${associations[0].id}`)
            expect(204)
    })
})

afterAll(()=>{
    moongose.connection.close()
    
})