import express from 'express'
import User from '../models/user.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/',authMiddleware,async (req,res)=>{
    try{
        const user = await User.findById(req.user.id).select("-password")
    if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
    res.status(200).json({message : "Welcome to app",user})
    }catch (error) {
        res.status(500).json({ message: "Server Error", error });
      }
})

export default router;