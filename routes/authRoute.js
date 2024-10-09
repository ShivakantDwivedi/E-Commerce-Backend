const express = require('express');
const { createUser, loginUserCtrl, getAllUsers,getaUser,deleteaUser, updateaUser, blockUser, unblockUser,handleRefreshToken,logout } = require('../controller/userCtro');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register' , createUser);
router.post('/login' ,loginUserCtrl)
router.get('/logout', logout)
router.get('/all-user' , getAllUsers)
router.get('/getauser/:id',authMiddleware,isAdmin,getaUser )
router.delete('/deleteauser/:id',deleteaUser )
router.put("/edituser" ,authMiddleware, updateaUser)
router.put("/blockUser/:id" , authMiddleware , isAdmin , blockUser )
router.put("/unblockUser/:id" , authMiddleware , isAdmin , unblockUser );
router.get('/refreshToken' , handleRefreshToken)



module.exports = router