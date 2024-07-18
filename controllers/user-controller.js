import User from "./model/user";
import bcrypt from "bcryptjs";

export const getAllUser = async(req,res,next) => {
    let users;
    try {
        users = await User.find();
    } catch(err) {
        console.log(err);
    } if (!users) {
        return res.status(404).json(
            {
                message: "no user found"
            }
        );
    }
    return res.status(200).json({ users });
};

export const signup = async (req,res,next) => {
    const {name,email,password} = req.body;
    let existingUser;

    try{
        existingUser = await User.find({email}); 
    }catch(err) {
        console.log(err);
    }
    if(existingUser){
        return res.status(400).json({ message: "user already exist"});
    }
    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({
        name,
        email,
        password: hashedPassword,
        blogs: [],
    });
    try {
        await user.save();
    }catch(err){
        return console.log(err);
    }
    return res.status(201).json({user})
}

export const logIn = async(req,res,next) => {
    const {email,password} = req.body;
    let existingUser;
    try{
        existingUser = await User.find({email}); 
    }catch(err) {
        return console.log(err);
    }
    if(!existingUser){
        return res.status(404).json({ message: "user doen't exist"});
    }
    const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password);
    if (!isPasswordCorrect){
        return res.status(400).json({message:"icorrect"})
    }
    return res.status(200).json({message:"correct"})
}
