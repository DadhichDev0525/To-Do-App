import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteTodo, fetchToDos, toggleExpand, updateToDo } from "../store"
import Button from "./Button"
import ExpandablePanel from "./ExpandablePanel"
import Input from "./Input"
import MenuIcon from "./menuIcon"
import Panel from "./Panel"
import Skeleton from "./Skeleton"
import SubToDoList from "./subToDoList"


const ToDoLists = (userId) => {
  const dispatch = useDispatch()

 const {isLoading , data, error,expandedToDoId} = useSelector((state)=>{
    return state.todos
  })
  const [activeMenu,setActiveMenu] = useState(null)
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedSubTodos, setEditedSubTodos] = useState({});


  useEffect(()=>{
    dispatch(fetchToDos(userId))

  },[dispatch])

  const handleProgressUpdate=(todoId,progress)=>{
    setTodoProgress(prev=>({...prev,[todoId]:progress}))
  }

  const handleEditClick = (todo)=> {
    setEditingTodoId(todo.id);
    setEditedTitle(todo.title);
    setEditedSubTodos({ ...todo.subToDos });

    if(expandedToDoId !== todo.id){
      if(todo.subToDos && Object.keys(todo.subToDos).length > 0){
        dispatch(toggleExpand(todo.id))
      }else{
        dispatch(toggleExpand(null))
      }
    }  
}

 const handleSave = (todo) =>{
  if (editedTitle.trim() !== "") {
    dispatch(updateToDo({ todoId : todo.id , title: editedTitle, subToDos: editedSubTodos }));
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
  }else if (data.length === 0) {
    content = <div className="p-3 text-2xl">No To-Dos found.</div>;
  } else if(error){
   content = <div>Error fetching data...</div>
  }else{
    content = data.map(todo=>{
     const panelHeading = (  
               editingTodoId === todo.id ?
               <div className="flex  items-center w-full">
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
                 key={todo.id} 
                 header={ panelHeading}
                 isExpanded={expandedToDoId === todo.id}
                 onToggle ={()=> handleToggleExpand(todo.id)}
                 menuIcon={
                 <MenuIcon 
                 onMenuOpen={setActiveMenu} 
                 activeMenu={activeMenu} 
                 menuId={todo.title} 
                 onDelete={()=>handleDeleteToDo(todo.id)} 
                 onEdit = {()=>handleEditClick(todo)} />}
                 onMenuOpen = {setActiveMenu}
              >
                <SubToDoList
                 todo={todo} 
                 onToDoEdit = {handleSave} 
                 editingTodoId={editingTodoId}  
                 editedSubTodos = {editedSubTodos}
                 setEditedSubTodos = {setEditedSubTodos}
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