import mongoose from "mongoose";
import Blog from "../model/Blog.js";
import User from "../model/User.js";

export const getAllBLogs = async(req,res,next) => {
    let blog;
    try {
        blog = await Blog.find();
    }catch(err) {
        return console.log(err);
    }
    if(!Blog){
        return res.status(400).json({message:"not found"});
    }
    return res.status(200).json({ blog });
}

export const addBlog = async(req,res,next) => {
    const {title,description,image,user} = req.body;
    let existingUser;
    try{
        existingUser = await user.findById(user);
    }catch(err){
        return console.log(err);
    }
    if(!existingUser){
        return res.status(400).json({message: "not found"})
    }
     const blog = new Blog({
        title,description,image,user,
     });
     try{
        const session = await mongoose.session.startSession();
        session.startSession();
        await blog.save({session});
        existingUser.blogs.push(blog);
        await existingUser.save({session})
        await session.commitTransaction();
     } catch(err){
        console.log(err);
        return res.status(500).json({message: err})
     }
     return res.status(200).json({ blog });
};

export const updateBlog = async (req,res,next) => {
    const {title,description} = req.body;
    const blogId = req.params.id;
    let blog;
    try{
     blog = await Blog.findByIdAndUpdate(blogId, {
        title,
        description
    })
}   catch(err){
    console.log(err)
}if(!blog){
    return res.status(400).json({message:"blog not upgraded"});
}
return res.status(200).json({ blog });
}

export const getBlogById = async(req,res,next) => {
    const id = req.params.id;
    let blog;
    try{
        blog = await Blog.findById(id)
   }   catch(err){
       console.log(err)
   }if(!blog){
       return res.status(400).json({message:"not found"});
   }
   return res.status(200).json({ blog });
}

export const deleteBlogById = async(req,res,next) => {
    const id = req.params.id;
    let blog;
    try{
        const blog = await blog.findByIdAndRemove(id).populate('user');
        await blod.user.blogs.pull(blog);
        await blog.user.save();
    }
    catch(err){
        console.log(err);
    }
    if(!blog){
        return res.status(400).json({message:"not found"});
    }
    return res.status(200).json({message:"deleted"});
}

export const getUserId = async(req,res,next) => {
    const userId = req.params.id;
    let userBlogs;
    try {
        userBlogs = await User.findById(userId).populate("blogs");
    }
    catch(err){
        return console.log(err);
    }
    if(!userBlogs){
        return res.status(400).json({message: "no blog found"})
    }
    return res.status(200).json({blogs:userBlogs})
}