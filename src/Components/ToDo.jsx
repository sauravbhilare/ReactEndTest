import React, { useState } from "react";

const ToDo = () => {
  const [tasks, setTasks] = useState([]);

  const handleOnclick = () => {
    setTasks(...tasks);
  };
  return (
    <div>
      <h1 className="text-3xl font-bold underline">ToDo List</h1>

      <input
        type="text"
        placeholder="Add a new task"
        className="border p-2 m-2"
        value={tasks[tasks.length - 1] || ""}
        onChange={(e) => {
          setTasks([...tasks, e.target.value]);
        }}
      />
      <button
        className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleOnclick}
      >
        Add
      </button>

      <div className="m-2 border-2 p-2 height-10rem">
        {
          (tasks.map = (task) => {
            task.tasks;
          })
        }
      </div>
    </div>
  );
};

export default ToDo;
