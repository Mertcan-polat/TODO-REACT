import React, { useState, useEffect, useRef } from "react";
import { useTodoLayerValue } from "./context/todoContent";
import TodoList from "./context/todoList.jsx";
import "./App.css";
export const App = () => {
  const [{ todos }, dispatch] = useTodoLayerValue();
  const [content, setContent] = useState("");
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!content && content.length < 1) return;

    const newTodo = {
      id: Math.floor(Math.random() * 5235325325),
      content,
      isCompleted: false,
    };
    dispatch({
      type: "ADD_TODO",
      payLoad: newTodo,
    });
    setContent(" ");
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="test"
          className="todo-input"
          onChange={(event) => setContent(event.target.value)}
          value={content}
          ref={inputRef}
        />
        <button className="todo-button">Add</button>
      </form>
      <TodoList todos={todos}></TodoList>
    </div>
  );
};
