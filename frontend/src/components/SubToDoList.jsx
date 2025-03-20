import { useDispatch } from "react-redux"
import { useState,useEffect } from "react"
import Panel from "./Panel"
import MenuIcon from "./menuIcon"
import Input from "./Input"
import Button from "./Button"
import { deleteSubTodo,updateSubToDo } from "../store"
import Checkbox from "./Checkbox"


const SubToDoList = ({ todo, onToDoEdit, editingTodoId, editedSubTodos,setEditedSubTodos}) => {
    const dispatch = useDispatch();
    const {subToDos} = todo;
    const [activeMenu,setActiveMenu] = useState(null);
    const [editingSubToDoKey, setEditingSubToDoKey] = useState(null);
    const [editedSubTitle, setEditedSubtitle] = useState('');
    const [dynamicSubTitles,setDynamicSubTitles] = useState(subToDos ? Object.keys(subToDos) : [])
    const progress = dynamicSubTitles.map(subTitle=>subToDos[subTitle]?.completed || false).filter(Boolean)
    const completionPercentage = dynamicSubTitles.length > 0 ? (progress.length/dynamicSubTitles.length) * 100 : 0 

   useEffect(()=>{
    setDynamicSubTitles(subToDos ? Object.keys(subToDos) : [])
   },[subToDos])

    const handleDeleteSubToDo=(subToDoKey)=>{
     dispatch(deleteSubTodo({todoId:todo.id,subToDoKey}))
    }

    const handleEditClick = (subToDoKey) =>{
      setEditingSubToDoKey(subToDoKey)
      setEditedSubtitle(subToDos[subToDoKey]?.name ||'')
    }
    const handleSaveSubToDo = (subToDoKey)=>{
      if (editedSubTitle.trim() === '') {
        alert("SubToDo cannot be empty!");
        return;
      }
      if(editedSubTitle.trim() !== ''){
          dispatch(updateSubToDo({
          todoId:todo.id, 
          subToDoKey, 
          updatedSubToDo: { 
            ...subToDos,
            [subToDoKey]:{
            completed : subToDos[subToDoKey].completed || false, 
            name : editedSubTitle  
          }}
        }))
      }
      setEditingSubToDoKey(null)
    }

    const handleAddSubToDo = ()=>{
      let nextIndex = 1;
      while(dynamicSubTitles.includes(`SubTitle${nextIndex}`)){
        nextIndex++;
      }
      const newKey = `SubTitle${nextIndex}`
     setDynamicSubTitles(prev=>[...prev,newKey])
    handleEditClick(newKey)

      dispatch(updateSubToDo({
        todoId: todo.id,
        subToDoKey: newKey,
        updatedSubToDo:{...subToDos, [newKey] : { name: '', completed: false }}
      }));
      
    }
    const handleComplete = (subToDoKey) => {
      dispatch(updateSubToDo({
        todoId: todo.id, 
        subToDoKey, 
        updatedSubToDo: { 
          ...subToDos, 
          [subToDoKey]: {
            ...subToDos[subToDoKey],
            completed: !subToDos[subToDoKey]?.completed 
          }
        }
      }));
    };

 let content;
 if(!subToDos || dynamicSubTitles.length===0){
  content = <div className="p-3 text-2xl">No Sub-To-Dos found.</div>
 }else{
  content =  dynamicSubTitles.map(key=>{ 
    if(!subToDos[key]) return null;
    return(
    <Panel key={key} className={`mb-2 flex justify-between items-center ${ subToDos[key]?.completed && '!border-green-600 !shadow-green-500 !shadow-inner'}`} >
      {
        (editingTodoId === todo.id && editingSubToDoKey !== key ) ?(
          // If the parent ToDo is being edited, allow inline subToDo editing
        <div className="flex  items-center w-full">
           <Input 
            value={ editedSubTodos[key].name  }
            onChange={(_,newTitle)=>{
              setEditedSubTodos(prev =>{
                const updated = {...prev[key],name:newTitle}
               return  ({...prev,[key]: updated})});
            }}
            onKeyDown = {(e)=> {if(e.key === 'Enter') onToDoEdit(todo)} }                   
          />
           <Button onClick ={()=> onToDoEdit(todo)} primary className='rounded py-2.5 ml-5 '>Save</Button>
         </div> 
 
       ) : editingSubToDoKey === key ? (
        // If only a specific subToDo is being edited
        <div className="flex  items-center w-full">
           <Input 
            value={ editedSubTitle }
            onChange={(_,newTitle)=> setEditedSubtitle(newTitle)}
            onKeyDown = {(e)=> {if(e.key === 'Enter') handleSaveSubToDo(key)} } 
            autoFocus                  
          />
           <Button onClick ={()=> handleSaveSubToDo(key)} primary className='py-2.5 ml-5 rounded'>Save</Button>
         </div> 
       ) : <div>{subToDos[key]?.name}</div>
 }
       <div className="flex items-center gap-x-10">
       <Checkbox onClick={()=>handleComplete(key)} checked={ subToDos[key]?.completed }  />
       <MenuIcon 
         onMenuOpen={setActiveMenu} 
         activeMenu={activeMenu} 
         menuId={key} 
         onDelete={()=>handleDeleteSubToDo(key)}
         onEdit ={()=> handleEditClick(key)}
       />
       </div>
    </Panel>
 )})}
  return (
    <div className= 'm-3 p-5' >
      <Button className='rounded mb-10 ml-auto' onClick={handleAddSubToDo}>Add SubToDo</Button>
      {content}
      {dynamicSubTitles.length > 0 && (
      <div className="mt-4 text-lg font-semibold">
        Progress: {completionPercentage.toFixed(1)}%
        <div className="w-full bg-gray-300 rounded-md h-2 mt-2">
          <div 
            className="bg-green-500 h-2 rounded-md transition-all" 
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>
    )}
      </div>
  )
}

export default SubToDoList;