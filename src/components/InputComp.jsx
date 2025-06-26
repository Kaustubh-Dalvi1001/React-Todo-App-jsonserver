import { TodoContext } from "../store/TodoContext";
import styles from "./InputComp.module.css";
import { useContext } from "react";

const InputComp = () => {
  const { handleAddBtn, btnTxt, inputTask, setInputTask } =
    useContext(TodoContext);
  const clickAddBtn = (e) => {
    e.preventDefault();
    if (inputTask.name === "") {
      return alert("Enter a task");
    } else if (inputTask.dueDate === "") {
      return alert("Enter a Date");
    }
    handleAddBtn(inputTask.name, inputTask.dueDate);
    setInputTask({ name: "", dueDate: "" });
  };

  return (
    <div>
      <form onSubmit={clickAddBtn}>
        <table className="table">
          <tbody>
            <tr>
              <td className={styles.taskTd}>
                <input
                  type="text"
                  className={`${styles.taskInp} form-control`}
                  placeholder="Enter Task"
                  value={inputTask.name}
                  onChange={(e) =>
                    setInputTask({ ...inputTask, name: e.target.value })
                  }
                />
              </td>
              <td className={styles.dateTd}>
                <input
                  type="date"
                  className={`${styles.dateInp} form-control`}
                  value={inputTask.dueDate}
                  onChange={(e) =>
                    setInputTask({ ...inputTask, dueDate: e.target.value })
                  }
                />
              </td>
              <td className={styles.btnTd}>
                <button
                  className={`${styles.addBtn} btn ${
                    btnTxt === "Add" ? "btn-primary" : "btn-success"
                  }`}
                >
                  {btnTxt}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default InputComp;
