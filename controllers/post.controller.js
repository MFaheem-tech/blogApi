import Post  from "../models/post.js";
import Comment from "../models/comment.js";



const PostController = {};

PostController.getAll = async (req, res) =>{
    try {
        const allBlogs= await Post.find();
        res.send(allBlogs);
    } 
    catch (error) {
    
    }
}

PostController.getPost = async (req, res)=> {
    try {
        const id = req.params.id;
        const rest = await Post.findById(id);
       
          res.json(rest);
        }
    catch (err)
     {
       }
    }


PostController.addPost = async (req, res) => {
    try { 
            
    const newPost= await Post.create(req.body);
    console.log(newPost);
      
       res.send(newPost);

    }
     catch (err) 
     {
     console.log(err);  
    }
}


PostController.updatePost = async(req, res) => {
    try {
        
        const updatePost = await Post.findOneAndUpdate(req.params.id);
           
        updatePost.title= req.body.title ;
        updatePost.description= req.body.description ;
             
                await updatePost.save();
                res.json(updatePost); 
            }
    
    catch (error) {
        
    }
}
 PostController.deletePost = async (req, res) => {
    try {
       const removePost = await Post.findByIdAndDelete(req.params.id)
           res.json(removePost);
    } catch (error) 
     {
        console.log(error);
        
    }
 }

//  PostController.addPost = async (req, res) => {

//    let comment = new comment({
//     auther: 'faheem',
//     description: req.body.description,
//     post: Post._id
//   });
//    comment.save((err, result) => {
//     if (err){
//         console.log(err);
//     } else{
//         Post.findById(req.params.id, (err, post) => {
//      if (err)  {
//         console.log(err);
//      }
//       post.comments.push(result);
//         post.save();
//         console.log(post.comments);
//          res.send(comment);
    
//      });
//     }
//         });
//     }

    PostController.addComment = async (req, res) => {
        try {
            const comment = new Comment({auther:req.body.auther, description:req.body.description,});
            await comment.save();
            await Post.findOneAndUpdate({_id:req.body._id}, {$push: {comment}});
             res.send("Comment was added successfully");
        
        } catch (error) 
         {
            console.log(error);
            
        }
     }
 
  export default PostController;