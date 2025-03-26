import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Panel from "./Panel";
import MenuIcon from "./menuIcon";
import Skeleton from "./Skeleton";
import Input from "./Input";
import Button from "./Button";
import {
  deleteSubTodo,
  updateSubToDo,
  fetchSubTodos,
  createSubTodos,
  toggleSubTodo,
} from "../store";
import Checkbox from "./Checkbox";

const SubToDoList = ({ todoId, onToDoEdit, editingTodoId }) => {
  const dispatch = useDispatch();
  const {
    isLoading,
    data: subToDos,
    error,
  } = useSelector((state) => state.subTodos);
  const [activeMenu, setActiveMenu] = useState(null);
  const [editingSubToDoKey, setEditingSubToDoKey] = useState(null);
  const [editedSubTitle, setEditedSubtitle] = useState("");
  const [isAddingNewSubTodo, setIsAddingNewSubTodo] = useState(false);
  const [editedSubTodos, setEditedSubTodos] = useState({});

  const progress = subToDos.filter((subtodo) => subtodo?.completed);
  const completionPercentage =
    subToDos.length > 0 ? (progress.length / subToDos.length) * 100 : 0;

  useEffect(() => {
    dispatch(fetchSubTodos(todoId));
  }, [dispatch, todoId]);

  useEffect(() => {
    if (editingTodoId === todoId) {
      const initialEditedSubTodos = subToDos.reduce((acc, subTodo) => {
        acc[subTodo._id] = { ...subTodo };
        return acc;
      }, {});
      setEditedSubTodos(initialEditedSubTodos);
    } else {
      setEditedSubTodos({});
      setEditingSubToDoKey(null);
    }
  }, [editingTodoId, subToDos]);
  const handleDeleteSubToDo = (subToDoId) => {
    dispatch(deleteSubTodo(subToDoId));
  };

  const handleAddSubToDo = () => {
    setIsAddingNewSubTodo(true);
    setEditingSubToDoKey("new");
    setEditedSubtitle('')
  };

  const handleCancelAddSubToDo = () => {
    setIsAddingNewSubTodo(false);
    setEditingSubToDoKey(null);
    setEditedSubtitle("");
  };

  const handleSaveNewSubToDo = () => {

    if (!editedSubTitle || editedSubTitle.trim() === "") {
      alert("SubToDo cannot be empty!");
      return;
    }
    dispatch(createSubTodos({ todoId, title: editedSubTitle }));

    setIsAddingNewSubTodo(false);
    setEditingSubToDoKey(null);
    setEditedSubtitle("");
  };

  const handleEditClick = (subToDo) => {
    setEditingSubToDoKey(subToDo._id);
    setEditedSubtitle(subToDo.title);
  };

  const handleSaveSubToDo = (subToDoId) => {
    const subtodoToSave = editedSubTodos[subToDoId];

    if (!subtodoToSave.title || subtodoToSave.title.trim() === "") {
      alert("SubToDo cannot be empty!");
      return;
    }
    dispatch(updateSubToDo({ subToDoId, title: subtodoToSave.title }));

    if (editingTodoId) onToDoEdit();

    setEditingSubToDoKey(null);
  };

  const handleComplete = (subToDoId) => {
    dispatch(toggleSubTodo(subToDoId));
  };

  let content;
  if (isLoading) {
    content = <Skeleton times={2} className="h-12 w-full" />;
  } else if (error) {
    content = <div>Error fetching data...</div>;
  } else {
    content = (
      <>
        {isAddingNewSubTodo && (
          <Panel key="new" className="mb-2 flex justify-between items-center">
            <div className="flex flex-col sm:flex-row  sm:items-center w-full">
              <Input
                value={editedSubTitle}
                onChange={(_, newTitle) => setEditedSubtitle(newTitle)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveNewSubToDo();
                  if (e.key === "Escape") handleCancelAddSubToDo();
                }}
                placeholder="Enter new sub-todo"
                autoFocus
              />
              <div className="flex gap-3 sm:ml-5">
                <Button
                  onClick={handleSaveNewSubToDo}
                  primary
                  className=" rounded"
                >
                  Save
                </Button>
                <Button onClick={handleCancelAddSubToDo} className="rounded">
                  Cancel
                </Button>
              </div>
            </div>
          </Panel>
        )}
        {subToDos.length === 0 && !isAddingNewSubTodo ? (
          <div key="no-subtodos" className="p-3 sm:text-2xl">
            No Sub-To-Dos found.
          </div>
        ) : (
          subToDos.map((subToDo) => (
            <Panel
              key={subToDo._id}
              className={`mb-2 flex justify-between items-center ${
                subToDo?.completed &&
                "!border-green-600 !shadow-green-500 !shadow-inner"
              }`}
            >
              {editingTodoId === todoId || editingSubToDoKey === subToDo._id ? (
                <div className="flex space-x-2 sm:space-x-5 items-center w-full">
                  <Input
                    value={
                      editingSubToDoKey === "new"
                        ? editedSubTitle
                        : editedSubTodos[subToDo._id]?.title || subToDo.title
                    }
                    onChange={(_, newTitle) => {
                      setEditedSubTodos((prev) => ({
                        ...prev,
                        [subToDo._id]: {
                          ...prev[subToDo._id],
                          title: newTitle,
                        },
                      }));
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSaveSubToDo(subToDo._id);
                      if (e.key === "Escape") setEditingSubToDoKey(null);
                    }}
                    autoFocus={editingSubToDoKey === subToDo._id}
                  />
                  <Button
                    onClick={() => handleSaveSubToDo(subToDo._id)}
                    primary
                    className="py-1.5 sm:py-2.5 sm:ml-5 rounded"
                  >
                    Save
                  </Button>
                </div>
              ) : (
                <div>{subToDo.title}</div>
              )}
              {!editingSubToDoKey && editingTodoId !== todoId && (
                <div className="flex items-center  gap-x-2 sm:gap-x-10">
                  <Checkbox
                    onClick={() => handleComplete(subToDo._id)}
                    checked={subToDo.completed}
                  />
                  <MenuIcon
                    onMenuOpen={setActiveMenu}
                    activeMenu={activeMenu}
                    menuId={subToDo._id}
                    onDelete={() => handleDeleteSubToDo(subToDo._id)}
                    onEdit={() => handleEditClick(subToDo)}
                  />
                </div>
              )}
            </Panel>
          ))
        )}
      </>
    );
  }
  return (
    <div className="sm:m-3 p-3 sm:p-5">
      <Button
        className="rounded mb-5 ml-auto"
        onClick={handleAddSubToDo}
        disabled={isAddingNewSubTodo}
      >
        Add SubToDo
      </Button>
      {content}
      {subToDos.length > 0 && (
        <div className="mt-4 text-sm sm:text-lg font-semibold">
          Progress: {completionPercentage.toFixed(1)}%
          <div className="w-full bg-gray-300 rounded-md h-2 mt-2">
            <div
              className="bg-green-500 h-2 rounded-md transition-all"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SubToDoList;
