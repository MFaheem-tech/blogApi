import mongoose  from "mongoose";


 const commentSchema = new mongoose.Schema({
   
    
    auther: {
        type: 'String',
        required: true
    },
    description: {
        type: 'String',
        required: true

    },
    commentTime: {
        type: 'Date',
        default: Date.now
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }

 });
 const  Comment = mongoose.model('Comment', commentSchema); 
 export default Comment;