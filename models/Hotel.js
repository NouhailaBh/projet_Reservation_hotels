import mongoose from 'mongoose';


const HotelSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
   
    city:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true
    },
    distance:{
        type:Number,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    photos:{
        type:[String],
    },
    desc:{
        type:String,
        required:true,
    },
    rating:{
        type: Number,
        min:0,
        max:5,
       
    },
    cheapestPrice:{
        type:Number,
        required:true,
    },
    adminId: {
        type: mongoose.Types.ObjectId,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
   
});
export default mongoose.model("Hotel",HotelSchema)