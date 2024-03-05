const mongoose= require('mongoose');

const userSchema=mongoose.Schema({
    username:String,
    userEmail:String,
    password:String,

},{
    versionKey:false
})

const UserModal=mongoose.model('user',userSchema)

module.exports={UserModal};