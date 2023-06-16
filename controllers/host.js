import Host from "../models/Host.js";


export const updateHost =async(req,res,next)=>{
    try{
        const updateHost= await Host.findByIdAndUpdate(
            req.params.id,
{$set: req.body},{new:true}
               );
           res.status(200).json(updateHost);
            }catch(err){
next(err);
}
}

                export const deleteHost =async(req,res,next)=>{
                    try{
                        await Host.findByIdAndDelete(
                            req.params.id
                               );
                           res.status(200).json("Host has been deleted");
                            }catch(err){
                next(err);
                }
                }



    export const getHost =async(req,res,next)=>{
       
                
       try{
        const host =await Host.findById(
         req.params.id,
           
            );
        res.status(200).json(host);
         }catch(err){
     next(err);
     }
     }

     
    export const getHosts =async(req,res,next)=>{
              
        try{
            const hosts =await Host.find();
            res.status(200).json(hosts);
             }catch(err){
      next(err);
      }
      }


      export const getId = async (req, res) => {
        try {
          const host = await Host.findOne({ username: req.params.username });
          if (!host) {
            return res.status(404).json({ message: "Host not found" });
          }
          res.json({ id: host._id });
        } catch (error) {
          res.status(500).json({ message: "Server error" });
        }
      };