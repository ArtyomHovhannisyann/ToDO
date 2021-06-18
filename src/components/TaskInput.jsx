import React, { useState } from "react";
import { Portal } from "react-portal";
import Modal from "react-modal";

let modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
export default function TaskInput({ addTask }) {
  const [hours, setHours] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [value, setValue] = useState("");
  const [newValue, setNewValue] = useState("");
  function setTaskValue(e) {
    if (e.code == "Enter" && value != "" || e.type == "click" && value !=   "") {
      addTask({
        type: "add",
        newValue: value,
      });
      setValue("");
    }
  }
  return (
    <div className="task-input">
      <input
        type="text"
        onChange={(e) => {
          return setValue(e.target.value);
        }}
        value={value}
        onKeyDown={setTaskValue}
        placeholder = "Add Task"
      />
      <button onClick={setTaskValue}>Add Task</button>
      <button onClick={() => addTask({ type: `remove` })}>Clear ToDo</button>
      <button onClick={() => addTask({ type: "selectAll" })}>
        Select All Tasks
      </button>
      <button onClick={() => setOpenModal(true)}>Add Temporary Task</button>
      <Portal node={document.body}>
        <Modal
          isOpen={openModal}
          style={modalStyle}
          onRequestClose={() => setOpenModal(false)}
        >
          <div className="modal">
            <div className="modal-inputs">
              <input
                type="text"
                onChange={(e) => setNewValue(e.target.value)}
                placeholder = "enter Task"
              />
              <input
                type="number"
                placeholder="enter Hour"
                max = {24}
                onChange={(e) => setHours(e.target.value)}
              />
              <button
                onClick={() => {
                  if (newValue) {
                    addTask({
                      type: `temporaryTask`,
                      hour: hours,
                      newValue: newValue,
                    });
                    setOpenModal(false)
                  }
                }}
              >
                Set
              </button>
            </div>
          </div>
        </Modal>
      </Portal>
    </div>
  );
}
