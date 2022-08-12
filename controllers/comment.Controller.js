import Comment from "../models/comment.js ";
 import Post from "../models/post.js";
 
const  commentContoller = {};

commentContoller.getAllComment = async (req, res) =>{
    try {
        const allComments = await Comment.find();
        res.send(allComments);
    } 
    catch (error) {
    
    }
}
// commentContoller.getComment = async (req, res)=> {
//     try {
//         const result = await Comment.findOne(req.params.id);
//         res.json(result);
        
//     } 
//     catch (err) {
         
//     }
// }
commentContoller.addComment = async (req, res) => {
    try { 
        const post = await Post.findOne({id:req.params.id})
        if(!post){
            return res.json({success:false, message:'Post not found'})  
        } 
    
        const comment = new Comment({
         description: req.body.description,
         post: post._id
      })
    
     
     await comment.save(); 
     const postRelated = await Post.findById(id);
     postRelated.comments.push(comment);
 
     await postRelated.save();
    

    }
     catch (err) 
     {
     console.log(err);  
    }
}


// commentContoller.editComment = async(req, res) => {
//     try {
//         const id = req.params.id;
//         const editComments = await Comment.findByIdAndUpdate(id)
           
//         editComments.title= req.body.title ;
//         editComments.description= req.body.description ;
//                 console.log("post to be saved");
//                 await editComments.save();
//                 res.json(editComments); 
//             }
    
//     catch (error) {
        
//     }
// }
// commentContoller.removeComment = async (req, res) => {
//     try {
//        const removeComments = await Comment.findByIdAndDelete(req.params.id)
//            res.json(removeComments);
//     } catch (error) 
//      {
//         console.log(error);
        
//     }

 export default commentContoller;