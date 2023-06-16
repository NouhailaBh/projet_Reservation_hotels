import User from "../models/User.js";
import Host from "../models/Host.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register =async (req,res,next)=>{
    try{
        const salt =bcrypt.genSaltSync(10);
        const hash =bcrypt.hashSync(req.body.password,salt);

        const newUser =new User({
            ...req.body,
            password:hash
        })

        await newUser.save()
        res.status(200).json(newUser);
    }catch(err){
        next(err)
    }
};

export const login =async (req,res,next)=>{
    
    try{
       
      const user = await  User.findOne({username:req.body.username})
      if(!user) {
       return res.status(403).send({message:" ce user n'existe pas!!"})
    }
      
      const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordCorrect){ 
            return res.status(402).send({message:" password ou username incorrectes !!"})};

        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET);
        const{ ...otherDeatails}=user._doc;
        res.cookie("access_token",token,{
            httpOnly: true,
        }).status(200).json({details:{...otherDeatails}});
    }catch(err){
        next(err)
    }
};



export const registerHost =async (req,res,next)=>{
    try{
        const salt =bcrypt.genSaltSync(10);
        const hash =bcrypt.hashSync(req.body.password,salt);

        const newHost =new Host({
            ...req.body,
            password:hash
        })

        await newHost.save()
        res.status(200).json(newHost);
    }catch(err){
        next(err)
    }
};

export const loginHost =async (req,res,next)=>{
    
    try{
        
      const host = await  Host.findOne({username:req.body.username})
      if(!Host) {
       return res.status(403).send({message:" ce Host n'existe pas!!"})
    }
      
      const isPasswordCorrect = await bcrypt.compare(req.body.password, host.password)
        if(!isPasswordCorrect){ 
            return res.status(402).send({message:" password ou username incorrectes !!"})};

       
        const token = jwt.sign({ id: host._id}, process.env.JWT_SECRET);
        const{...otherDeatails}=host._doc;
        res.cookie("access_token",token,{
            httpOnly: true,
        }).status(200).json({details:{...otherDeatails}});
    }catch(err){
        next(err)
    }
};

export const forgotPasswordHost = async (req, res, next) => {
  try {
    const { email, number } = req.body;

   
    const host = await Host.findOne({ email, number });

    if (!host) {
      return res.status(404).json({ message: "Aucun hôte trouvé avec ces informations" });
    }

   
    const hostId = host._id;
    const password = host.password;

    res.status(200).json({ hostId, password });
  } catch (err) {
    next(err);
  }
};



export const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const hostId =  req.params.id;
   // console.log("Admin ID:", hostId);
  
    const host = await Host.findById(hostId);
    const isPasswordCorrect = await bcrypt.compare(oldPassword, host.password);

    if (!isPasswordCorrect) {
      return res.status(400).send({ message: 'Ancien mot de passe incorrect !' });
    }

    
    const salt = bcrypt.genSaltSync(10);
    const newHash = bcrypt.hashSync(newPassword, salt);
    await Host.findByIdAndUpdate(hostId, { password: newHash });

    res.status(200).send({ message: 'Mot de passe modifié avec succès !' });
  } catch (err) {
    next(err);
  }
};

export const NewPassword = async (req, res, next) => {
  try {
    const {newPassword } = req.body;
    const hostId =  req.params.id;
  
    const host = await Host.findById(hostId);
    const salt = bcrypt.genSaltSync(10);
    const newHash = bcrypt.hashSync(newPassword, salt);
    await Host.findByIdAndUpdate(hostId, { password: newHash });

    res.status(200).send({ message: 'Mot de passe modifié avec succès !' });
  } catch (err) {
    next(err);
  }
};
export const changePasswordUser = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId =  req.params.id;
   // console.log("Admin ID:", hostId);

    const user = await User.findById(userId);
    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).send({ message: 'Ancien mot de passe incorrect !' });
    }
    const salt = bcrypt.genSaltSync(10);
    const newHash = bcrypt.hashSync(newPassword, salt);

    await User.findByIdAndUpdate(userId, { password: newHash });

    res.status(200).send({ message: 'Mot de passe modifié avec succès !' });
  } catch (err) {
    next(err);
  }
};