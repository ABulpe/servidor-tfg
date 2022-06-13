 const User = require('../models/User')
 const bcrypt = require('bcrypt')
 const {api, getUsers} = require('./helpers')
 const moongose = require('mongoose')

 describe('creating a new user', () => {
    beforeEach(async() => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('pswd', 10)
    const user = new User({
        name: 'Abraham', 
        passwordHash, 
        surname: 'Alvarez',
        email: 'abraham@gmail.com',
        role: 2
    })
    await user.save()
    })
    
    test('works as expected creating a fresh username', async () => {
        const usersAtStart = await getUsers()
    
        const newUser = {
          name: 'Jose Ramon',
          password: 'tw1tch',
          surname: 'Gaitero',
          email: 'joserra@gmail.com',
          role: 2
          
        }
    
        await api
          .post('/api/users')
          .send(newUser)
          .expect(201)
          .expect('Content-Type', /application\/json/)
    
        const usersAtEnd = await getUsers()
    
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    
        const names = usersAtEnd.map(u => u.names)
        expect(names).toContain(newUser.name)
    })
    test('creation fails with proper statuscode and message if username is already taken', async () => {
        const usersAtStart = await getUsers()

        const newUser = {
          name: 'Cesar',
          password: 'tw1tch',
          surname: 'Cesar',
          email: 'cesar@gmail.com',
          role: 2
        }

        const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(409)
        .expect('Content-Type', /application\/json/)

        console.log(result.body)

        expect(result.body.error).toContain('expected `email` to be unique')

        const usersAtEnd = await getUsers()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)

    })

    afterAll(() => {
        moongose.connection.close()
        server.close()
      })

 })