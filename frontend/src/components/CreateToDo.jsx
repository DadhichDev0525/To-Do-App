import { useDispatch } from "react-redux"
import { useState } from "react"
import Panel from "./Panel"
import Button from "./Button"
import Input from "./Input"
import { createsToDos} from "../store"
import { RxCross2 } from "react-icons/rx";

const CreateToDo = ({hideAddToDo,token}) => {
    const dispatch = useDispatch();
    const [inputs,setInputs] = useState({})
    const [labels, setLabels] = useState(['SubTitle1','SubTitle2'])
  
    const handleSubmit =  (event)=>{
      event.preventDefault();
      if(Object.keys(inputs).length !== 0){
        dispatch(createsToDos({inputs,token}))
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
      <Input 
        key={label} 
        name={label} 
        value={inputs[label] || ''} 
        onChange={handleChange} 
        label = {`Add ${label} :`} 
      />
    ))
   
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-black opacity-90 overflow-y-auto p-4">
        <Panel className='relative w-full max-w-md rounded-lg shadow-lg'>
          <div 
            className="absolute top-3 right-4 cursor-pointer " 
            onClick={hideAddToDo}
          >
            <RxCross2 />
          </div>
          
          <form 
            className="flex flex-col space-y-4 p-6 max-h-[70vh] overflow-y-auto custom-scrollbar" 
            onSubmit={handleSubmit}
          >
            <Input 
              name='title' 
              value={inputs.title || ''} 
              onChange={handleChange} 
              label='Add Title :' 
              required={Object.keys(inputs).length !== 0} 
              autoFocus 
            />
            
            {renderedInputs}     
              <Button  
                className='rounded self-center cursor-pointer '
              >
                Submit
              </Button>
          </form>
          <Button  
                className='mb-2 rounded mt-3 ml-2 cursor-pointer ' 
                onClick={addSubtitle}
              >
                Add Subtitle
              </Button>
        </Panel>
      </div>
    ) 
}

export default CreateToDo;