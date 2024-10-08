const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt')
const {ObjectId} = mongoose

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,     
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    isBlocked : {
        type : Boolean,
        default : false
    },
    role : {
        type : String,
        default : "user"
    },
    cart : {
        type : Array,
        default : [],
    },
    address : [ {type : ObjectId, ref : "Address"}],
    wishlist : [{type : ObjectId , ref :"Product"}],

    refreshToken : {
        type : String
    }

}, {
    timestamps : true
});


userSchema.pre('save' , async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password , salt)
})

userSchema.methods.isPasswordMatched = async function (enterPassword) {
    return bcrypt.compare(enterPassword , this.password)
}


//Export the model
module.exports = mongoose.model('User', userSchema);