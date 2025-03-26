import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ToDoLists from "./components/ToDoLists";
import CreateToDo from "./components/CreateToDo";
import { logoutUser, fetchUser } from "./store";
import Button from "./components/Button";
import { RxCross2 } from "react-icons/rx";
import Panel from "./components/Panel";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token, error } = useSelector((state) => state.auth);
  const [showAddToDo, setShowAddToDo] = useState(false);

  useEffect(() => {
    if(token && !user){
      dispatch(fetchUser());
    }

  }, [dispatch,token,user]);

  const handleDeleteUser = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div className="h-[100vh]  bg-black">
      <div className="mt-3 sm:mt-10 ml-3 sm:ml-5">
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
      {error ? (
        <Panel className="text-red-500 text-center">
        {error?.message || "Something went wrong. Please login again."}
      </Panel>
      ) : (
        user && (
          <div className="flex justify-between sm:justify-center m-3 sm:w-1/2 sm:m-auto items-center rounded-sm bg-white gap-10 group p-2 sm:py-5 text-2xl  sm:text-3xl font-semibold ring-2 sm:ring-4 ring-gray-400 cursor-pointer">
            <h1>{`${user?.firstname}'s ToDos`}</h1>
            <div
              className=" sm:opacity-0 sm:invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300"
              onClick={handleDeleteUser}
            >
              <RxCross2 />
            </div>
          </div>
        )
      )}
      {!error ? (
        showAddToDo ? (
          <CreateToDo
            hideAddToDo={() => setShowAddToDo(false)}
            userId={user?._id}
            token={token}
          />
        ) : (
          <ToDoLists token={token} user={user} />
        )
      ) : null}
    </div>
  );
};

export default App;
