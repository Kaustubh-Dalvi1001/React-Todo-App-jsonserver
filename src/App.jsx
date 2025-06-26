import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Head from "./components/Head";
import InputComp from "./components/InputComp";
import DisplayInp from "./components/DisplayInp";
import NoTask from "./components/NoTask";
import { useContext } from "react";
import TodoContextProvider, { TodoContext } from "./store/TodoContext";

function App() {
  return (
    <TodoContextProvider>
      <MainApp />
    </TodoContextProvider>
  );
}

const MainApp = () => {
  const { todoList } = useContext(TodoContext);
  return (
    <div className="containerDiv">
      <Head />
      <InputComp />
      {todoList.length === 0 && <NoTask />}
      <DisplayInp />
    </div>
  );
};

export default App;
