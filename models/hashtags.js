import mongoose from 'mongoose';
const hashtagsSchema=new mongoose.Schema({
title:{
    type:String,
    required:true,
    unique :true
},

//what all tweet belonging to this hashtags

tweets:[
    {
        type:mongoose.Schema.Types.ObjectId,     
        //store tweet id 
        ref:'Tweet'
    }
]
},{timestamps:true})
hashtagsSchema.pre('save',function(next){
   this.title= this.title.toLowerCase();
    next();
})
const Hashtag=mongoose.model('hashtag',hashtagsSchema);
export default Hashtag;

