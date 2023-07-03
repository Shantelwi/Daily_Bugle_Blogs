import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title:{
        type: 'string',
        required: true
    },
    content: {
        type: 'string',
        required: true
    },
    image:{
        type: 'string'
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    comments:{
        type: 'string',
        created: {type: Date, default: Date.now},
        postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
    },
    createdOn :{
        type: Date,
        default: Date.now    
    }
})

const Blog = mongoose.model('blog', blogSchema)

export default Blog;