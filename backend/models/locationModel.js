const express = require('express')
const mongoose = require('mongoose');
const locationSchema = require('../schemas/locationSchema');

const locationModel = mongoose.model('locationModel',locationSchema,'Locate');
module.exports=locationModel;