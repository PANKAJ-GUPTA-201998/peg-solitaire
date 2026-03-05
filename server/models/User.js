const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

username:String,

email:String,

password:String,

gamesPlayed:{
type:Number,
default:0
},

gamesWon:{
type:Number,
default:0
},

bestScore:{
type:Number,
default:999
}

})

module.exports = mongoose.model("User",userSchema)