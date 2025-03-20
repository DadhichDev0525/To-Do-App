import { CiMenuKebab } from "react-icons/ci";

const MenuIcon = ({onMenuOpen, activeMenu, menuId, onDelete, onEdit}) => {
    const isOpen = activeMenu === menuId;


  return (
    <div onClick={()=>onMenuOpen(isOpen ? null : menuId)} className='cursor-pointer relative mr-5' >
              <CiMenuKebab/>
              {
                isOpen && 
                <div className='flex flex-col shadow  text-white bg-black border absolute top-5 right-0.5 rounded z-1'>
                  <div onClick={onEdit} className='hover:bg-gray-700 py-3 px-8 border '>Edit</div>
                  <div onClick={onDelete} className='hover:bg-gray-700 py-3 px-8 border '>Delete</div>
                </div>
              }
              </div>
  )
}

export default MenuIcon;