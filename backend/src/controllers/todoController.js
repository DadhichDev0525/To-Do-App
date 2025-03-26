import Todo from "../models/todo.js";
import SubTodo from "../models/subtodo.js";

export const getTodos = async(req,res)=>{
    try{
        const todos = await Todo.find({userId:req.user.id})
        res.status(200).json(todos)
    }catch(error){
        res.status(500).json({message : "Server Error"})
    }
}

export const createTodo = async (req,res)=>{
    try{
        const { title } = req.body
        const userId = req.user.id;

        const newTodo = new Todo({userId, title})
        await newTodo.save()

        res.status(200).json(newTodo)
    }catch(error){
        res.status(500).json({message : "Server Error",error})
    }
}

export const deleteTodo = async(req,res)=>{
    try{
        const todoId = req.params.id
        await SubTodo.deleteMany({todoId})
        await Todo.findByIdAndDelete(todoId)
        res.status(200).json({message:"Todo and associated Subtodos Deleted"})
    }catch(error){
        res.status(500).json({message : "Server Error",error})
    }
}

export const updateTodo = async(req,res)=>{
    try{
        const todo = await Todo.findById(req.params.id)
        if(!todo){
            res.status(404).json({message:"Todo not found"})
        }
        todo.title = req.body.title;
        await todo.save();

        res.status(200).json({message:"Todo Updated"})
    }catch(error){
        res.status(500).json({message : "Server Error",error})
    }
}