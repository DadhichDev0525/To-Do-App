import mongoose from "mongoose";

const subtodoSchema = new mongoose.Schema({
    todoId: { type: mongoose.Schema.Types.ObjectId, ref: "Todo", required: true },
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
})

export default mongoose.model('SubTodo', subtodoSchema);