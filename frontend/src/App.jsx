import { useState,useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import ToDoLists from "./components/ToDoLists"
import CreateToDo from "./components/CreateToDo"
import { fetchUser,deleteUser } from "./store"
import Button from "./components/Button"
import UserNameInput from "./components/UserNameInput"
import { RxCross2 } from "react-icons/rx";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state=>state.user)
  const [showAddToDo, setShowAddToDo] = useState(false)
  let userName;
  if(user.length !==0){
    userName = user[0].name;
  }
  useEffect(()=>{
    dispatch(fetchUser())
  },[dispatch])

  const handleDeleteUser = ()=>{
     dispatch(deleteUser(user[0].id))
  }

  return (
    <div className="h-full bg-black">
      <div className="pt-10 pl-5">
        <Button 
          disabled={showAddToDo} 
          onClick={()=> setShowAddToDo(!showAddToDo) }  
          className={`rounded bg-white font-semibold cursor-pointer ${showAddToDo && 'bg-gray-300 cursor-not-allowed'}`}
        >
          Add To-Do
        </Button>
      </div>
      {
        user.length !== 0 &&
        <div className="flex justify-center w-1/2 m-auto items-center rounded-md bg-white gap-10 group py-5 text-3xl font-semibold ring-4 ring-gray-400 cursor-pointer">
        <h1>{`${userName}'s ToDos`}</h1>
          <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300" onClick={handleDeleteUser}>
            <RxCross2/>
          </div>
      </div>
      } 
      { showAddToDo
        ? <CreateToDo hideAddToDo = {()=> setShowAddToDo(false)} userId={userName}/>
        : user.length===0 ?
         <UserNameInput />
         : <ToDoLists userId={userName} /> 
      }

    </div>
  )
}

export default App