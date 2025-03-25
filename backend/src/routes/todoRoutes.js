import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getTodos,createTodo,deleteTodo,updateTodo } from "../controllers/todoController.js";

const router = express.Router();

router.post('/',authMiddleware,createTodo)
router.get('/',authMiddleware,getTodos)
router.delete('/:id',authMiddleware,deleteTodo)
router.patch('/:id',authMiddleware,updateTodo)

export default router;