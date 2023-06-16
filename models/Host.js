import mongoose from 'mongoose';


const HostSchema =new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
   
    password:{
        type:String,
        required:true,
    },
    number:{
        type:Number,
        required:true,
    },
  
      
   
},
{ timestamps:true}
);
export default mongoose.model("Host",HostSchema)