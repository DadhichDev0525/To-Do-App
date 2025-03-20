import classNames from "classnames"
import { useState } from "react";
import { IoMdCheckmark } from "react-icons/io";

const Checkbox = ({checked, onClick, className})=>{
    // const [isChecked, setIsChecked] = useState(checked)
    const classes = classNames(
        'w-5 h-5 border-2 border-gray-400 rounded cursor-pointer',
        checked && 'bg-green-500 border-green-500'
    )

    return (
        <div 
           className={classes}
           onClick={onClick}
        >
            {checked && <IoMdCheckmark />}
        </div>
    )
}

export default Checkbox