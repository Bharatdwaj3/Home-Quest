const mongoose = require('mongoose');

const ownerSchema=new mongoose.Schema({
    
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    name:{type:String,required:true,trim:true},
    age:{type:String,required:true,trim:true},

    email: {type:String, required: true, trim: true},
    phone: {type:Number, required: true, trim: true},

    gender:{type:Boolean,required:true,trim:true},
    family:{type:Boolean, required:true, trim:true},
    imageUrl:{type:String},
    cloudinaryId:{type:String}
});


module.exports = ownerSchema;