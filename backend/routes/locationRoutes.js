const express = require('express');
const router=express.Router();
const {getLocations, getLocation, createLocation, updateLocation, deleteLocation} = require('../controllers/LocationController');


router.get('/', getLocations);
router.get("/:id", getLocation);
router.post("/", createLocation);
router.put("/:id", updateLocation);
router.delete("/:id", deleteLocation);

module.exports=router;