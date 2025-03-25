import SubTodo from "../models/subtodo.js";

export const getSubTodos = async (req,res) => {
  try {
    const subTodos = await SubTodo.find({ todoId: req.params.todoId });

    res
      .status(200)
      .json({ message: "SubTo-Dos fetched successfully", subTodos });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const createSubTodo = async (req, res) => {
  try {
    const { todoId, subToDos } = req.body;

    if (!todoId || !subToDos || typeof subToDos !== "object") {
      return res.status(400).json({ message: "Invalid request body" });
    }

    const subTodosArray = Object.entries(subToDos).map(([key, value]) => ({
      todoId,
      title: value,
      completed: false,
    }));
  

    const newSubTodos = await SubTodo.insertMany(subTodosArray);
   
    res
      .status(201)
      .json({ message: "sub-Todo's created", subToDos: newSubTodos });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const deleteSubTodo = async (req, res) => {
  try {
    const subTodo = await SubTodo.findByIdAndDelete(req.params.id);
    if (!subTodo) {
      return res.status(404).json({ message: "SubTo-Do not found" });
    }

    res.status(200).json({ message: "SubTo-Do deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const updateSubTodo = async (req, res) => {
  try {
    const updatedSubTodo = await SubTodo.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title },
      { new: true }
    );

    if (!updatedSubTodo) {
      return res.status(404).json({ message: "SubTo-Do not found" });
    }

    res.status(200).json({ message: "SubTo-Do updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const toggleSubTodo = async (req, res) => {
  try {
    const subTodo = await SubTodo.findById(req.params.id);

    if (!subTodo) {
      return res.status(404).json({ message: "SubTo-Do not found" });
    }

    subTodo.completed = !subTodo.completed;
    await subTodo.save();
    
    res.status(200).json({ message: "SubTo-Do toggled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
