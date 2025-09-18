import React, { useEffect } from "react";
import ToDoForm from "./ToDoForm";
import { v4 as uuidv4 } from "uuid";
import EditTodoForm from "./EditTodoForm";
import TodoList from "./TodoList";
import { toast } from "react-toastify";

const ToDoWrapper = () => {
  const [todos, setTodos] = React.useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  const normalizeTask = (task) => task.trim().toLowerCase();

  const addTodo = (task) => {
    const normalizedTask = normalizeTask(task);

    if (!normalizedTask) {
      toast.info("Task cannot be empty");
      return;
    }

    const isDuplicate = todos.some(
      (todo) => normalizeTask(todo.task) === normalizedTask
    );

    if (isDuplicate) {
      toast.info("Task already exists");
      return;
    }

    setTodos([
      ...todos,
      { id: uuidv4(), task: task.trim(), completed: false, isEditing: false },
    ]);

    toast.success("Task added successfully");
  };

  const deleteTodo = (id) => {
    toast.info(
      <div>
        <p>Are you sure you want to delete this task?</p>
        <button
          onClick={() => {
            setTodos(todos.filter((todo) => todo.id !== id));
            toast.success("Task deleted successfully");
          }}
        >
          Confirm
        </button>
        <button onClick={() => toast.dismiss()}>Cancel</button>
      </div>,
      {
        autoClose: false,
        closeButton: false,
      }
    );
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          const updatedTodo = { ...todo, completed: !todo.completed };
          if (updatedTodo.completed) {
            toast.success("Task completed! 🎉");
          }
          return updatedTodo;
        }
        return todo;
      })
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

    toast.success("Task updated successfully");
  };

  const clearAllTodos = () => {
    toast.info(
      <div>
        <p>Are you sure you want to clear all tasks?</p>
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <button
            style={{
              padding: "5px 10px",
              background: "#8e5093",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
            onClick={() => {
              setTodos([]);
              toast.success("All tasks cleared successfully");
            }}
          >
            Confirm
          </button>
          <button
            style={{
              padding: "5px 10px",
              background: "#f5f5f5",
              border: "none",
              borderRadius: "4px",
            }}
            onClick={() => toast.dismiss()}
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeButton: false,
      }
    );
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

      {/* Sticky footer */}
      <div className="sticky-footer">
        {todos.length > 0 && (
          <>
            <button className="clear-btn" onClick={clearAllTodos}>
              Clear All
            </button>
            <br />
            <span className="todo-count">
              Total Tasks: {todos.length} | Remaining Tasks:{" "}
              {todos.filter((todo) => !todo.completed).length}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default ToDoWrapper;
