import { useReducer } from "react";
import "./App.css";
import TaskRow from "./components/TaskRow";
import TaskInput from "./components/TaskInput";

let id = 0;
function reducer(state, action) {
  switch (action.type) {
    case `add`:
      return [...state, { id: ++id, value: action.newValue, isDone: false }];

    case `toggle`:
      return state.map((el) => {
        if (el.id == action.elemId) {
          return { id: el.id, value: el.value, isDone: !el.isDone };
        }
        return el;
      });

    case `remove`:
      return state.filter((el) => !el.isDone);
    case `elemRemove`:
      return state.filter((el) => el.id != action.elemId);
    case `selectAll`:
      return state.map((el) => {
        return { id: el.id, value: el.value, isDone: true };
      });
    case `temporaryTask`:
      return [...state, { id: ++id, type:`temporary` , value: action.newValue, isDone: false, hour:action.hour,}];
  }
}
function App() {
  const [tasks, dispatch] = useReducer(reducer, []);

  return (
    <div className="App">
      <div className="todo">
        <div className="header">
          <TaskInput addTask={dispatch} />
        </div>
        <div className="rows">
          {tasks.length > 0 &&
            tasks.map((el, i) => {
              return <TaskRow task={el} changeTaskState={dispatch} key={i} />;
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
