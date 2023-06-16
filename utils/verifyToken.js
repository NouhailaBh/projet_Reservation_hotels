import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyToken = (req,res,next)=>{
    const token =req.cookies.access_token;
    if(!token){
        return next(createError(401, "you are not authenticated :"))
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err)
        return next(createError(403, "Token is not valid:"))
            req.user =user;
            next()
    });
};

export const verifyUser =(req,res,next)=>{
    verifyToken(req,res,()=>{
        //qroit de modification de user c'est l'user si ila le meme id 
        //est aussi l'admin
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }
        else{
        return next(createError(403, "you are not authorized:"));
        }
    });
} ;

export const verifyAdmin =(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        //droit de modification de l'admin seulement 
        if(req.user.isAdmin){
            next();
        }
        else{
        return next(createError(403, "Admin not authorized:"));
        }
    });
} ;