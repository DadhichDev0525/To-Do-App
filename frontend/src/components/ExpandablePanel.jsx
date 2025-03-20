
import { GoChevronDown, GoChevronLeft } from 'react-icons/go';


function ExpandablePanel({ header, children, menuIcon, onMenuOpen, isExpanded, onToggle }) {

  

  const handleClick = () => {
    onToggle();
    if(onMenuOpen){
      onMenuOpen(null);
    } 
  };

  return (
    <div className="mb-2 border rounded ">
      <div   className=" flex justify-between items-center p-3">
        <div onClick={handleClick} className="flex  items-center h-12 w-full  " >
          {header}
        </div>
        <div className='flex gap-2 '>
         {menuIcon && <>{menuIcon}</>}
          <div onClick={handleClick} className='cursor-pointer' >
           {isExpanded ? <GoChevronDown /> : <GoChevronLeft />}
          </div>
        </div>
      </div>
      {isExpanded && <div className="p-2 border-t">{children}</div>}
    </div>
  );
}

export default ExpandablePanel;
