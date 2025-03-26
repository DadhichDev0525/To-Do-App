import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access Denied: No Token Provided" });
    }

    jwt.verify(token.split(" ")[1], process.env.JWT_SECRET,(err,decode)=>{
      if(err){
        if(err.name === 'TokenExpiredError'){
         return res.status(401).json({message:"Token expired, Please login again"})
        }
        return res.status(403).json({ message: "Invalid token." });
      }
        
        req.user = decode;
        next();
      
      
    });
   
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" ,error});
  }
};

export default authMiddleware;
