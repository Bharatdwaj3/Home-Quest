const express = require('express');
const upload=require('../services/multer.js');
const router=express.Router();
const {
    getTenants,
    getTenant,
    deleteTenant,
    updateTenantProfile
} = require('../controllers/tenantController.js');


const authMiddleware = require('../middleware/authMiddleware');
const checkPermission = require('../middleware/checkPermission');
const roleMiddleware = require('../middleware/roleMiddleware');
const authUser = require('../middleware/authMiddleware');

router.get('/',
    authMiddleware,
    roleMiddleware(['admin','owner','tenant']),
    checkPermission('view_tenants'),
    getTenants);
router.get("/:id",
    authUser,
    roleMiddleware(['tenant']),
    checkPermission('view_self'),
    getTenant);
router.put("profile/:id",
    upload.single('image'),
    authUser,
    roleMiddleware(['tenant']),
    checkPermission('update-self'),
    updateTenantProfile);
router.delete("/:id",
    authMiddleware,
    roleMiddleware(['admin']),
    checkPermission('delete_tenant'),
    deleteTenant);

module.exports=router;