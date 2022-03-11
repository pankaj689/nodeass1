const mongoose = require('mongoose');
const { Schema } = mongoose;

const postschema= new Schema({
    name:{type:String,required:true},
    email:{type:String,unique:true , required:true },
    password:{type:String}
})

const ass5= mongoose.model('ass5',postschema);

module.exports =ass5