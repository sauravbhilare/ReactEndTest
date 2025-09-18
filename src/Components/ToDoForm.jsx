import React from "react";

const ToDoForm = ({ addTodo }) => {
  const [value, setValue] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value) {
      addTodo(value);
      setValue("");
    }
  };
  return (
    <form className="ToDoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="What is the task today?"
      />
      <button type="submit" className="todo-btn">
        Add Task
      </button>
    </form>
  );
};

export default ToDoForm;
