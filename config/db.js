const mongoose = require('mongoose')


const db = mongoose.connect('mongodb://localhost:27017/authsystem', {
    useNewUrlParser: true
    , useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB')
}).catch((err) => {
    console.log('Nothing to connect to MongoDB')
    console.log(err)
})

module.exports = db