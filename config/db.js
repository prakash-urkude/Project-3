const mongoose = require("mongoose");
const colors = require("colors")
const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true})
        console.log(
            `connected to mongodb datbase ${mongoose.connection.host}`.bgMagenta.white
        )
    }catch(error){
        console.log(`mongo connect error ${error}`.bgRed.white)
    }
}
module.exports = connectDB