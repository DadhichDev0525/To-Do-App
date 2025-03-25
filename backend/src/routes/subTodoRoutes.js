import express from 'express'
import { createSubTodo,getSubTodos,deleteSubTodo,updateSubTodo,toggleSubTodo } from '../controllers/subTodoController.js'

const router = express.Router()

router.get('/:todoId',getSubTodos)
router.post('/',createSubTodo)
router.delete('/:id',deleteSubTodo)
router.patch('/:id',updateSubTodo)
router.patch('/:id/toggle',toggleSubTodo)

export default router;