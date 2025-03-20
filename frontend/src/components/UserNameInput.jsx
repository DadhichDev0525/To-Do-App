import { useState } from "react"
import { useDispatch } from "react-redux"
import { createUser } from "../store"
import Input from "./Input"
import Panel from "./Panel"
import Button from "./Button"

const UserNameInput = () => {
    const dispatch = useDispatch();
    const[userName,setUserName] = useState('')

    const handleSave = ()=>{
        dispatch(createUser(userName))
        setUserName('')
    }

  return (
    <div className="absolute inset-0 flex justify-center items-center bg-black opacity-90 ">
        <Panel className='flex flex-col justify-around bg-black p-10 w-1/3 min-w-xs m-5 h-[50vh] shadow-2xl shadow-black '>
        <h1 className="self-center text-4xl font-bold">To-Do APP</h1>
        <div>
        <Input
           name = 'name'
           label = 'UserName :'
           value={userName}
           onChange={(_,inputValue)=> setUserName(inputValue)}
           onKeyDown = {(e)=> {if(e.key === 'Enter') handleSave()}}
           autoFocus
        />
        <Button onClick={handleSave} className='rounded px-7 mx-auto mt-3 bg-white font-semibold cursor-pointer text-black'>Save</Button>
        </div>      
    </Panel>
    </div>
  )
}

export default UserNameInput