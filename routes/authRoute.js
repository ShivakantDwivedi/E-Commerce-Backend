const express = require('express');
const { createUser, loginUserCtrl, getAllUsers,getaUser,deleteaUser, updateaUser } = require('../controller/userCtro');
const router = express.Router();

router.post('/register' , createUser);
router.post('/login' ,loginUserCtrl)
router.get('/all-user' , getAllUsers)
router.get('/getauser/:id',getaUser )
router.delete('/deleteauser/:id',deleteaUser )
router.put("/:id" , updateaUser)


module.exports = router