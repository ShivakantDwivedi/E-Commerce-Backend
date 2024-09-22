const {default : mongoose, model} = require('mongoose')
const db = process.env.DB_URL
const dbConnect = () => {


    try {
        const conn = mongoose.connect(db);
        console.log('Database is connected successfully')
    } catch (error) {
        console.log('Database error' , error)
    }

}

module.exports = dbConnect