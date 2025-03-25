import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteTodo, fetchToDos, toggleExpand, updateToDo, fetchSubTodos } from "../store"
import Button from "./Button"
import ExpandablePanel from "./ExpandablePanel"
import Input from "./Input"
import MenuIcon from "./menuIcon"
import Panel from "./Panel"
import Skeleton from "./Skeleton"
import SubToDoList from "./SubToDoList"


const ToDoLists = () => {
  const dispatch = useDispatch()

 const {isLoading , data, error,expandedToDoId} = useSelector((state)=>{
    return state.todos
  })
  const { data: subTodos } = useSelector((state) => state.subTodos)
  const [activeMenu,setActiveMenu] = useState(null)
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedSubTodos, setEditedSubTodos] = useState({});


  useEffect(()=>{
    dispatch(fetchToDos())
  },[dispatch,])

  const hasSubTodos = (todoId) => {
        dispatch(fetchSubTodos(todoId))
    return subTodos.some(subTodo => subTodo.todoId === todoId);
  }

  const handleEditClick = (todo)=> {
    setEditingTodoId(todo._id);
    setEditedTitle(todo.title);

    if(expandedToDoId !== todo._id){
      dispatch(toggleExpand(hasSubTodos(todo._id) ? todo._id : null))
    }
    
}

const handleSave = (todo) => {
  if (editedTitle.trim() !== "") {
    dispatch(updateToDo({ 
      todoId: todo._id, 
      title: editedTitle 
    }));
  }
  setEditingTodoId(null);
}

  const handleToggleExpand = (todoId) => {
    dispatch(toggleExpand(todoId));
  }

  const handleDeleteToDo =(todoId)=>{
    dispatch(deleteTodo(todoId))
  }


let content;
  if(isLoading){
    content = <Skeleton times={5} className= 'h-12 w-full' />
  }else if (data?.length === 0) {
    content = <div className="p-3 text-2xl">No To-Dos found.</div>;
  } else if(error){
   content = <div>Error fetching data...</div>
  }else{
    content = data?.map(todo=>{
     const panelHeading = (  
               editingTodoId === todo._id ?
               <div className="flex  items-center w-full" onClick={(e)=>e.stopPropagation()}>
                 <Input 
                  value={editedTitle}
                  onChange={(_,newTitle)=> setEditedTitle(newTitle)}
                  onKeyDown = {(e)=> {if(e.key === 'Enter') handleSave(todo)} }
                  autoFocus                   
                />
                 <Button 
                   primary
                   onClick ={()=> handleSave(todo)}  
                   className='py-2.5 ml-5 rounded'
                 > Save
                 </Button>        
               </div>
               : todo.title       
     )

      return <ExpandablePanel
                 className='mb-3' 
                 key={todo._id} 
                 header={ panelHeading}
                 isExpanded={expandedToDoId === todo._id}
                 onToggle ={()=> handleToggleExpand(todo._id)}
                 menuIcon={
                 <MenuIcon 
                 onMenuOpen={setActiveMenu} 
                 activeMenu={activeMenu} 
                 menuId={todo.title} 
                 onDelete={()=>handleDeleteToDo(todo._id)} 
                 onEdit = {()=>handleEditClick(todo)} />}
                 onMenuOpen = {setActiveMenu}
              >
                <SubToDoList
                 todoId={todo._id}  
                 editingTodoId={editingTodoId}  
                 onToDoEdit={()=>handleSave(todo)}
                 />    
             </ExpandablePanel>
    })
  }


  return (
    <Panel className= 'm-5 p-5 min-w-2xs ' >
      {content}
      </Panel>
  )
}

export default ToDoLists