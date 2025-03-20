import { useDispatch } from "react-redux"
import { useState } from "react"
import Panel from "./Panel"
import Button from "./Button"
import Input from "./Input"
import { createsToDos} from "../store"
import { RxCross2 } from "react-icons/rx";

const CreateToDo = ({hideAddToDo,userId}) => {
    const dispatch = useDispatch();
    const [inputs,setInputs] = useState({})
    const [labels, setLabels] = useState(['SubTitle1','SubTitle2'])
  

    const handleSubmit =  (event)=>{
      event.preventDefault();
      if(Object.keys(inputs).length !== 0){
        dispatch(createsToDos({userId,inputs}))
      }  
      setInputs({})
      hideAddToDo()
     
    }
    const handleChange = (name, value)=>{
      setInputs(inputs=>{
        return {
          ...inputs,
           [name] : value
        }
      } )
    }
    const addSubtitle = ()=>{
        setLabels(prev=>(
          [
            ...prev,
            `SubTitle${prev.length+1}`
          ]
        ))
    }

    const renderedInputs = labels.map(label =>(
      <Input key={label} name={label} value={inputs.label} onChange={handleChange} label = {`Add ${label} :`} />
    ))
   
    

  return (
    <div className="absolute inset-0 flex justify-center items-center bg-black opacity-90 ">
      <Panel className='relative w-1/3 min-w-xs m-5 shadow-lg shadow-gray-700 '>
      <div className="absolute right-3 cursor-pointer" onClick={hideAddToDo}><RxCross2 /></div>
      <form className="flex flex-col justify-around px-10 pt-4" onSubmit={handleSubmit}>
        <Input name='title' value={inputs.title} onChange={handleChange} label = 'Add Title :' required ={Object.keys(inputs).length !== 0} autoFocus  />
         {renderedInputs}     
          <Button className='rounded self-center mt-3' >Submit</Button>
      </form>
      <Button className='mb-2 rounded mt-3 ml-2' onClick={addSubtitle}>Add Subtitle</Button>
    </Panel>
    </div>
    
  ) 
}

export default CreateToDo;