const mongoose = require('mongoose');
const locationSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        trim:true,
        maxlength:[500, 'Description cannot exceed 500 characters']
    },
    latitude:{
        type:Number,
        required:[true, 'Latitude is required'],
        min: [-90, 'Latitude is required'],
        max : [90, 'Latitude must be between -90 and 90']
    },
    longitude: {
        type: Number,
        required: [true, 'Logitude is required'],
        min :[-180,'Longitude must be between 180 and 180'],
        max: [180, 'Longitude must be between -180 and 180']
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
    updatedAt:{
        type:Date,
        default: Date.now
    }
});

