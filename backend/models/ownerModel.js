const express = require('express')
const mongoose = require('mongoose');
const ownerSchema = require('../schemas/ownerSchema');

const ownerModel = mongoose.model('ownerModel', ownerSchema,'owner');
module.exports=ownerModel;