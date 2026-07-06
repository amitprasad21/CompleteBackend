export const authMiddleware = (req , res,next)=>{
    console.log("Auth Middleware" , req.session.username);
    if(req.session && req.session.username){
       return next();
    }
    res.status(401).json({message:"Unauthorized: Please Login In"})
}