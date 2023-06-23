function findAllData(quotesCollection) {
    return new Promise((resolve,reject) => {
        const data =  quotesCollection.find().toArray()
        resolve(data)
    })
}

function findSingleData(data,req) {
    return new Promise((resolve,reject) => {
        const found = data.some(d => d._id == req.body._id)
        resolve(found)
    })
}



function insertData(quotesCollection,data) {
    return new Promise((resolve,reject) => {
        const result =  quotesCollection.insertOne({name: data.name, message: data.message})
        resolve(result)
    })
}

function changeData(quotesCollection,req, o_id) {
    return new Promise((resolve,reject) => {
        const result =  quotesCollection.findOneAndUpdate({ _id: o_id }, {
            $set: {
                message: req.body.message
            }
        })
    resolve(result)
    })
}

function removeData(quotesCollection,req, o_id) {
    return new Promise((resolve,reject) => {
        const result =  quotesCollection.findOneAndDelete({ _id: o_id })
        resolve(result)
    })
}

module.exports = {findAllData, insertData, changeData, findSingleData, removeData}