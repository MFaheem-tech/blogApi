const mongoose = require ("mongoose");



 const postSchema = new mongoose.Schema({
 
    title: {
        type: 'String',
        required: true
    },
    description: {
        type: 'String',
        required: true

    },
    createdAt: {
        type: 'Date',
        default: Date.now
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
      }]
 });
 module.exports = mongoose.model("Post", postSchema); 
