var ObjectID = require('mongodb').ObjectId;
const Server = require('../models/model')

async function getData(res,res,quotesCollection) {
    try {
        const data = await Server.findAllData(quotesCollection)
        res.render('index.ejs', {datas: data})
    } catch (error) {
        console.log(error)
    }
}

async function postData(req,res,quotesCollection) {
    try {
        const data = req.body
        const result = await Server.insertData(quotesCollection,data)
        console.log(result)
        res.redirect('/')
    } catch (error) {
        
    }
}

async function updateData(req,res,quotesCollection) {
    try {
        const data = await Server.findAllData(quotesCollection)
        const found = await Server.findSingleData(data,req)

        let o_id = new ObjectID(req.body._id);

        if (found) {
            const result = await Server.changeData(quotesCollection,req,o_id)
            console.log(result)
        }
    } catch(error) {
        console.log(error)
    }
}

async function deleteData(req,res,quotesCollection) {
    try {
        const data = await Server.findAllData(quotesCollection)
        const found = await Server.findSingleData(data,req)

        let o_id = new ObjectID(req.body._id);

        if (found) {
            const result = await Server.removeData(quotesCollection,req,o_id)
            console.log(result)
        }
    } catch (error) {
        console.log(error)
    }
}




module.exports = { getData, postData, updateData, deleteData }