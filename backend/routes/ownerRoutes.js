const express=require('express');
const router=express.Router();
const upload=require('../services/multer');
const{
    getOwner, deleteOwner, 
    getOwners,updateOwnerProfile
    
} =require('../controllers/ownerController');

const checkPermission = require('../middleware/checkPermission');
const roleMiddleware = require('../middleware/roleMiddleware');
const authUser=require('../middleware/authMiddleware');

router.get('/',
    roleMiddleware(['admin','owner','tenant']),
    checkPermission('view_owners'),
    getOwners);
router.get('/:id',
    authUser, 
    roleMiddleware(['owner']), 
    checkPermission('view-self'),
    getOwner);
router.put('/profile/:id',
    upload.single('image'), 
    authUser, 
    roleMiddleware(['owner']), 
    checkPermission('update-self'), 
    updateOwnerProfile);
router.delete('/:id',
    roleMiddleware(['admin']), 
    checkPermission('delete_owner'), 
    deleteOwner);

module.exports=router;