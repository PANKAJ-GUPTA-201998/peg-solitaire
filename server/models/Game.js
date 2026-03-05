const mongoose = require("mongoose")

const gameSchema = new mongoose.Schema({

userId:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},

moves:Number,

marblesLeft:Number,

win:Boolean,

playedAt:{
type:Date,
default:Date.now
}

})

module.exports = mongoose.model("Game",gameSchema)