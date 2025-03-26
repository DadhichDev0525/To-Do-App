import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteTodo, fetchToDos, toggleExpand, updateToDo, fetchSubTodos,store,getWeather } from "../store"
import Button from "./Button"
import ExpandablePanel from "./ExpandablePanel"
import Input from "./Input"
import MenuIcon from "./menuIcon"
import Panel from "./Panel"
import Skeleton from "./Skeleton"
import SubToDoList from "./SubToDoList"

const outdoorKeywords = ["walk", "jog","exercise", "run", "hike", "trek", "cycling", "picnic", "beach", "camp", "outdoor", "park", "swimming"];

const ToDoLists = ({token,user}) => {
  const dispatch = useDispatch()

 const {isLoading , data:todos, error,expandedToDoId} = useSelector((state)=>{
    return state.todos
  })
  const { data: weather } = useSelector((state) => state.weather)
  const [activeMenu,setActiveMenu] = useState(null)
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const outdoorTask = todos.find(todo =>
    outdoorKeywords.some(keyword => todo.title.toLowerCase().includes(keyword))
  );

  useEffect(()=>{
    if(token && user){
      dispatch(fetchToDos())
    }
  },[dispatch])

  useEffect(() => {
    if (outdoorTask) {
      dispatch(getWeather("Jaipur")); 
    }
  }, [dispatch, outdoorTask]);
  

  const handleEditClick = async (todo)=> {
    setEditingTodoId(todo._id);
    setEditedTitle(todo.title);

    await dispatch(fetchSubTodos(todo._id)).unwrap()

    const subTodos = store.getState().subTodos.data;
    const hasSubs = subTodos.some(subTodo => subTodo.todoId === todo._id)

      if (expandedToDoId !== todo._id) {
        dispatch(toggleExpand(hasSubs ? todo._id : null));
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
  }else if(error){
    content = <div>Error fetching data...</div>
   }else if (todos?.length === 0) {
    content = <div className="p-3 text-2xl">No To-Dos found.</div>;
  }else{
    content = <>
    {weather && (
        <div className="bg-zinc-800 p-3 rounded mb-3">
          <h3 className="font-bold">Weather for Outdoor Activities:</h3>
          <p>🌡️ Temp: {weather.main.temp}°C</p>
          <p>🌦️ Condition: {weather.weather[0].description}</p>
        </div>
      )}
   {todos?.map(todo=>{
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
                   className='py-1.5 sm:py-2.5 ml-2 sm:ml-5 rounded'
                 > Save
                 </Button>        
               </div>
               : todo.title       
     )

      return <ExpandablePanel
                 key={todo._id} 
                 header={ panelHeading}
                 isExpanded={expandedToDoId === todo._id}
                 onToggle ={()=> handleToggleExpand(todo._id)}
                 menuIcon={ !editingTodoId && 
                 <MenuIcon 
                 onMenuOpen={setActiveMenu} 
                 activeMenu={activeMenu} 
                 menuId={todo.title} 
                 onDelete={()=>handleDeleteToDo(todo._id)} 
                 onEdit = {()=>handleEditClick(todo)} />
                }
                 onMenuOpen = {setActiveMenu}
              >
                <SubToDoList
                 todoId={todo._id}  
                 editingTodoId={editingTodoId}  
                 onToDoEdit={()=>handleSave(todo)}
                 />    
             </ExpandablePanel>
    })}
    </>
  }


  return (
    <Panel className= 'm-3 sm:m-5 sm:p-5 min-w-min ' >
      {content}
      </Panel>
  )
}

export default ToDoLists