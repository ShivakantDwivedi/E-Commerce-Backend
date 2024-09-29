const asyncHandler = require('express-async-handler');
const  User = require('../models/userModel');
const generateToken = require('../config/jwtToken');

// create a user
const createUser = asyncHandler(async(req, res) =>{
    const email = req.body.email;
    const findUser = await User.findOne({email: email});

    if(!findUser) {
        const newUser = await User.create(req.body)
        res.json(newUser)
    }
    else{
        throw new Error("User Already Exists")
    }
})

// login a user
const loginUserCtrl = asyncHandler(async ( req , res) => {
    const {email , password} = req.body;

    const findUser  = await User.findOne({email});

    if(findUser && (await findUser.isPasswordMatched(password))){
        res.json({
            _id : findUser?._id , 
            firstname : findUser?.firstname,
            lastname : findUser?.lastname,
            email : findUser?.email,
            mobile : findUser?.mobile,
            token : generateToken(findUser?._id)
    })
    }else {
        throw new Error("Invalid Credentials")
    }
})

// update a user
const updateaUser = asyncHandler( async( req , res) => {
    const {id} = req.params;
    try {
        const updatedUser  = await User.findByIdAndUpdate(id, {
            firstname : req.body?.firstname,
            lastname : req.body?.lastname,
            email : req.body?.email,
            mobile : req.body?.mobile
        }, {
            new : true
        });
        res.json(updatedUser)
    } catch (error) {
        throw new Error(error)
    }
})



// get all user
const getAllUsers = asyncHandler ( async (req , res) => {
    try {
        const getUser = await User.find()
        res.json(getUser)
    } catch (error) {
            throw new Error(error)
    }
})


// get a single user
const getaUser = asyncHandler(async ( req , res) => {
    const {id} = req.params;
    try {
        const  getaUser = await User.findById(id);
        res.json(getaUser)
    } catch (error) {
        throw new Error(error)        
    }
})


// delete a single user
const deleteaUser = asyncHandler(async ( req , res) => {
    const {id} = req.params;
    try {
        const  deleteaUser = await User.findByIdAndDelete(id);
        res.json(deleteaUser)
    } catch (error) {
        throw new Error(error)        
    }
})


module.exports = {createUser, loginUserCtrl, getAllUsers, getaUser, deleteaUser, updateaUser}