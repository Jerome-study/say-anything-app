const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;
const {getData,postData,updateData, deleteData} = require('./controllers/controllers')



const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())



const connectionString = process.env.MONGODBURL 
mongoDBServer()

async function mongoDBServer () {
    try {
        const client = await MongoClient.connect(connectionString, { useUnifiedTopology: true })
        console.log('Connected to database')

        const db = client.db('wall-comment')
        const quotesCollection = db.collection('messages')
        

        

        app.get('/', async function (req,res) {
            getData(req,res,quotesCollection)
            
        })

        app.post('/quotes', async function (req,res) {
            postData(req,res,quotesCollection)
            
        })

        app.put('/quotes', async function (req,res) {
             updateData(req,res,quotesCollection)
             res.redirect(req.get('referer'));
        })

        app.delete('/quotes', async function (req,res) {
             deleteData(req,res,quotesCollection)
             res.redirect(req.get('referer'));
        })
        



    } catch (error) {
        console.log(error)
    }
}




const port = process.env.PORT || 5000
app.listen(port, function () {
    console.log(`The server is running on port ${port}!`)
})