const express = require('express')
const mongoose = require('mongoose');
const tenantSchema = require('../schemas/tenantSchema');

const tenantModel = mongoose.model('tenantModel', tenantSchema,'tenant');
module.exports=tenantModel;