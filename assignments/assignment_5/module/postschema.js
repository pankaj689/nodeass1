const  mongoose =require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    title:{type:String, required:true},
    body:{type:String, required:true},
    user:{type:Schema.Types.ObjectId,ref:"user"},
    Image:{type:String}
  
});

const post = mongoose.model('post', postSchema);

module.exports = post