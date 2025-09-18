import React, { useEffect } from "react";
import ToDoForm from "./ToDoForm";
import { v4 as uuidv4 } from "uuid";
import EditTodoForm from "./EditTodoForm";
import TodoList from "./TodoList";

const ToDoWrapper = () => {
  const [todos, setTodos] = React.useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  const normalizeTask = (task) => task.trim().toLowerCase();

  const addTodo = (task) => {
    const normalizedTask = normalizeTask(task);

    if (!normalizedTask) {
      alert("Task cannot be empty");
      return;
    }

    const isDuplicate = todos.some(
      (todo) => normalizeTask(todo.task) === normalizedTask
    );

    if (isDuplicate) {
      alert("Task already exists");
      return;
    }

    setTodos([
      ...todos,
      { id: uuidv4(), task: task.trim(), completed: false, isEditing: false },
    ]);
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (id, task) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, task: task, isEditing: !todo.isEditing }
          : todo
      )
    );
  };

  const clearAllTodos = () => {
    if (window.confirm("Are you sure you want to clear all tasks?")) {
      setTodos([]);
    }
  };

  React.useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="TodoWrapper">
      <h1 style={{ marginTop: "20px" }}>BASIC TODO APP</h1>

      <div className="sticky-form">
        <ToDoForm addTodo={addTodo} />
      </div>

      <div className="task-list-scrollable">
        {todos.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "20px", color: "red" }}>
            Task Not Available...! Please Add New Task.
          </p>
        ) : (
          todos.map((todo) =>
            todo.isEditing ? (
              <EditTodoForm key={todo.id} editTodo={editTask} task={todo} />
            ) : (
              <TodoList
                key={todo.id}
                task={todo}
                deleteTodo={deleteTodo}
                toggleComplete={toggleComplete}
                editTodo={editTodo}
              />
            )
          )
        )}
      </div>

      {todos.length > 0 && (
        <button onClick={clearAllTodos} style={{ marginTop: "20px" }}>
          Clear All
        </button>
      )}
    </div>
  );
};

export default ToDoWrapper;
