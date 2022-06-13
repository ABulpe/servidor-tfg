const app = require('../app')
const supertest = require('supertest')
const User = require('../models/User')
const Association = require('../models/Association')
const News = require('../models/News')
const Image = require('../models/Image')

const bussinesRouter = require('../controllers/bussines')

const api = supertest(app)

const initialBussines =[
    {
        bussinessName: "Bar Stop",
        imageUrl: "http://localhost:3001/public/image-1653948230193.png",
        description: "El clasico bar de nuestra barriada ahora renovado para ofrecer de nuevo sus mejores churros",
        streetAddress: "Av Segunda Aguada, 11007 Cádiz",
        streetNumber: 7,
        postalCode: 11519,
        latitude: 1,
        longitude: 1,
        email: "test@example.com",
        mobile: "666555444",
        phone: "856777876",
        instagram: "test",
        facebook: "test",
        twitter: "test",
    
    },
    {
        bussinessName: "Farmacia Afríca",
        imageUrl: "http://localhost:3001/public/image-1653948520357.png",
        description: "Farmacia de confianza del barrio",
        streetAddress: "Av Segunda Aguada, 11007 Cádiz",
        streetNumber: 7,
        postalCode: 11519,
        latitude: 1,
        longitude: 1,
        email: "test@example.com",
        mobile: "666555444",
        phone: "856777876",
        instagram: "test",
        facebook: "test",
        twitter: "test",
    },
]
const initialNews = [
    {
        title: "test",
        imageUrl: "test",
        content: "test",
        date: "test",
        create: "test",
        author: "test",

    },
    {
        title: "test",
        imageUrl: "test",
        content: "test",
        date: "test",
        create: "test",
        author: "test",
    }
]

const initialAssociations = [
    {
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
    },
    {
        name: "test",
        imageUrl: "test",
        description: "test",
        streetAddress: "Av Segunda Aguada, 11007 Cádiz",
        streetNumber: 7,
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
]

const initialImages = [
    {
        imageUrl: "test",
        created_at: "test",
        updated_at: "test",
    },
    {
        imageUrl: "test",
        created_at: "test",
        updated_at: "test",
    }
]

const getUsers = async (req, res) => {
    const usersDB = await User.find({})
    return usersDB.map(user =>user.toJSON())
}

const getBussines = async (req, res) => {
    const bussinesDB = await Bussines.find({})
    return bussinesDB.map(bussines => bussines.toJSON())
}

const getAssociations = async (req, res) => {
    const associationsDB = await Association.find({})
    return associationsDB.map(association => association.toJSON())
}

const getNews = async (req, res) => {
    const newsDB = await News.find({})
    return newsDB.map(news => news.toJSON())
}

const getImages = async (req, res) => {
    const imagesDB = await Image.find({})
    return imagesDB.map(images => images.toJSON())
}



module.exports = {
    api,
    initialBussines, 
    initialImages,
    initialNews,
    initialAssociations,
    getUsers,
    getNews,
    getAssociations,
    getImages,
    getBussines,
   

}