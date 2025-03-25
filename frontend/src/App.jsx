import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ToDoLists from "./components/ToDoLists";
import CreateToDo from "./components/CreateToDo";
import { logoutUser,fetchUser } from "./store";
import Button from "./components/Button";
import { RxCross2 } from "react-icons/rx";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user, token} = useSelector((state) => state.auth);
  const [showAddToDo, setShowAddToDo] = useState(false);
  // let userName;
  // if(user.length !==0){
  //   userName = user[0].name;
  // }
  useEffect(() => {
    if(!user){
    dispatch(fetchUser());
    }
  },[dispatch]);

  const handleDeleteUser = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div className="h-[100vh]  bg-black">
      <div className="pt-10 pl-5">
        <Button
          disabled={showAddToDo}
          onClick={() => setShowAddToDo(!showAddToDo)}
          className={`rounded bg-white font-semibold cursor-pointer ${
            showAddToDo && "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Add To-Do
        </Button>
      </div>
      {user && (
        <div className="flex justify-center w-1/2 m-auto items-center rounded-md bg-white gap-10 group py-5 text-3xl font-semibold ring-4 ring-gray-400 cursor-pointer">
          <h1>{`${user?.firstname}'s ToDos`}</h1>
          <div
            className="opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300"
            onClick={handleDeleteUser}
          >
            <RxCross2 />
          </div>
        </div>
      )}
      {showAddToDo ? (
        <CreateToDo hideAddToDo={() => setShowAddToDo(false)} userId={user?._id} token={token} />
      ) : (
        <ToDoLists  />
      )}
    </div>
  );
};

export default App;
