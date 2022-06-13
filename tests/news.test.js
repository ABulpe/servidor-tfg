const moongose = require('mongoose');
const News = require('../models/News')
const {api, initialNews, getNews} =require ('./helpers')


beforeEach(async ()=>{
    await News.deleteMany({})
    
    for (const news of initialNews) {
        newsObject = new News(news)
        await newsObject.save()
      }

})

describe('Get all News', ()=>{
    test("News are resturned as json", async ()=>{
     
        await api
        .get('/api/news')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        
       
    })

    test('there are two news', async () => {
        const response = await api.get('/api/news')
        expect(response.body).toHaveLength(initialNews.length)
        
        
    })

})

describe('Create a news', async ()=>{
    test('create a news', async () => {
        const newNews = {
            title: "test",
            imageUrl: "test",
            content: "test",
            date: "test",
            create: "test",
            author: "test",
        }

        await api
            .post('/api/news')
            .send(newNews)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    test('a news can be deleted', async() =>{
        const news = getNews()
         await api
            .delete(`/api/news/${news[0].id}`)
            expect(204)
    })
})

afterAll(()=>{
    moongose.connection.close()
    
})