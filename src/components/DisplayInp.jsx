import { useContext } from "react";
import styles from "./DisplayInp.module.css";
import { TodoContext } from "../store/TodoContext";

const DisplayInp = () => {
  const { todoList, delTask, editTask } = useContext(TodoContext);
  return (
    <div>
      <table className="table">
        <tbody>
          {todoList.map((task) => (
            <tr key={task.id}>
              <td className={styles.taskTd}>{task.name}</td>
              <td className={styles.dateTd}>{task.dueDate}</td>
              <td>
                <button
                  className={`${styles.delBtn} btn btn-outline-success`}
                  onClick={() => editTask(task)}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  className={`${styles.delBtn} btn btn-outline-danger`}
                  onClick={() => delTask(task.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayInp;
