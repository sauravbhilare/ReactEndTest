import React from "react";

const EditTodoForm = ({ editTodo, task }) => {
  const [value, setValue] = React.useState(task.task);

  const handleSubmit = (e) => {
    e.preventDefault();
    editTodo(task.id, value);
  };
  return (
    <div>
      <form className="TodoForm" onSubmit={handleSubmit}>
        <input
          type="text"
          className="todo-input"
          placeholder="Update Task"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" className="todo-btn">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditTodoForm;
