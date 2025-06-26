import { useEffect, useState } from "react";
import axios from "axios";
import { createContext } from "react";

export const TodoContext = createContext({
  todoList: [],
  delTask: () => {},
  editTask: () => {},
  handleAddBtn: () => {},
  btnTxt: "Add",
  inputTask: { name: "", dueDate: "" },
  setInputTask: () => {},
});

const TodoContextProvider = ({ children }) => {
  const jsonUrl = "https://todo-json-server-kud8.onrender.com/myTasks";
  let [todoList, setTodoList] = useState([]);

  //fetch task when components mount
  useEffect(() => {
    axios
      .get(jsonUrl)
      .then((res) => {
        setTodoList(res.data);
      })
      .catch((err) => {
        console.log(`error fetching task ${err}`);
      });
  }, []);

  const [taskId, setTaskId] = useState(0);

  // Adding a new state to hold the input values
  const [inputTask, setInputTask] = useState({
    name: "",
    dueDate: "",
  });

  // add task
  const handleAddBtn = (taskName, taskDate) => {
    if (btnTxt === "Add") {
      const newTask = {
        name: taskName,
        dueDate: taskDate,
      };
      axios
        .post(jsonUrl, newTask)
        .then((res) => {
          setTodoList([...todoList, res.data]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .patch(`${jsonUrl}/${taskId}`, inputTask)
        .then((res) => {
          const updatedList = todoList.map((task) =>
            task.id === taskId ? res.data : task
          );
          setTodoList(updatedList);
          setbtnTxt("Add");
          setInputTask({ name: "", dueDate: "" });
        })
        .catch((err) => console.log(err));
    }
  };

  // delete task
  const delTask = (taskid) => {
    axios
      .delete(`${jsonUrl}/${taskid}`)
      .then(() => {
        setTodoList(todoList.filter((taskList) => taskList.id !== taskid));
      })
      .catch((err) => {
        console.log(`Error deleting task ${err}`);
      });
  };

  const [btnTxt, setbtnTxt] = useState("Add");

  // Edit Task
  const editTask = (task) => {
    setbtnTxt("Update");
    setInputTask({ name: task.name, dueDate: task.dueDate });
    setTaskId(task.id);
  };
  return (
    <TodoContext.Provider
      value={{
        todoList,
        delTask,
        editTask,
        handleAddBtn,
        btnTxt,
        inputTask,
        setInputTask,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
