import { useState } from "react";

export default function TaskRow({ task, changeTaskState }) {
  const [isTemporaryTask, setIsTemporaryTask] = useState(false);
  function changeState() {
    changeTaskState({ type: "toggle", elemId: task.id });
  }
  if (task.type) {
    setTimeout(() => {
      setIsTemporaryTask(true);
    }, task.hour * 3600000 - 500);
    setTimeout(() => {
      changeTaskState({ type: `elemRemove`, elemId: task.id });
    }, task.hour * 3600000);
  }
  return (
    <div
      className={`${task.isDone ? "del" : "save"} ${
        isTemporaryTask ? "changeBg" : ""
      }`}
    >
      <p>{task.value}</p>
      <input type="checkbox" onChange={changeState} checked={task.isDone} />
      <img
        src="https://icons-for-free.com/iconfiles/png/512/delete+remove+trash+trash+bin+trash+can+icon-1320073117929397588.png"
        className="trash"
        onClick={() => changeTaskState({ type: `elemRemove`, elemId: task.id })}
      />
    </div>
  );
}
