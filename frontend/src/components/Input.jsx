import classNames from "classnames"

const Input = ({value,onChange, className, ...rest }) => {
  const {name, label} = rest;

    const classes = classNames("p-3 my-2 border rounded w-full" ,className)


  return ( 
  <div>
     {label && <label htmlFor={name} className="block mb-1 font-semibold text-xl">{label}</label>}
    <input 
      id={name}
      name={name}
      className={classes} 
      value= { value }
      onChange={(e)=>onChange(name,e.target.value)}  
      {...rest} 
    />
  </div>
)}

export default Input