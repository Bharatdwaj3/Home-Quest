const express=require('express');
const router=express.Router();
const upload=require('../services/multer');

const{
    getPGs,
  	getPG,
  	createPG,
  	deletePG,
} =require('../controllers/pgController');

const checkPermission = require('../middleware/checkPermission');
const roleMiddleware = require('../middleware/roleMiddleware');
const authUser=require('../middleware/authMiddleware');

router.get('/',
    roleMiddleware(['admin','owner','tenant']),
    checkPermission('view_pg'),
    getPGs);
router.get('/:id',
    authUser, 
    roleMiddleware(['owner','admin','tenant']), 
    checkPermission('view_self'),
    getPG);
router.post('/',
    authUser,
    upload.single('image'), 
    roleMiddleware(['owner','admin']),
    checkPermission('create_pg'),
    createPG);
router.delete('/:id',
    roleMiddleware(['admin','owner']), 
    checkPermission('delete_pg'), 
    deletePG);

module.exports=router;