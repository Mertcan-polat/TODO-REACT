import React, { useState } from "react";
import clsx from "clsx";
import { GrFromClose, GrFormEdit, GrFormCheckmark } from "react-icons/gr";
import { useTodoLayerValue } from "../context/todoContent";
const Todo = ({ todo }) => {
  const [dispatch] = useTodoLayerValue();
  const [editable, setEditable] = useState(false);
  const [content, setContent] = useState(todo.content);
  const removeTodo = (todoId) => {
    dispatch({
      type: "REMOVE_TODO",
      payload: todoId,
    });
  };
  const completeTodo = (todoId) => {
    dispatch({
      type: "COMPLETE_TODO",
      payload: todoId,
    });
  };
  const updateTodo = ({ todoId, newValue }) => {
    dispatch({
      type: "UPDATE_TODO",
      payload: { todoId, newValue },
    });
  };

  const todoStyle = clsx({
    "todo-row": true,
    completed: todo.isCompleted,
  });
  return (
    <div className={todoStyle}>
      <div onClick={() => (editable ? "" : completeTodo(todo.id))}>
        {editable ? (
          <input
            type="text"
            value
            {...content}
            onChange={(event) => setContent(event.target.value)}
            className="todo-input-edit"
          ></input>
        ) : (
          todo.content
        )}
      </div>
      <div className="todo-icons">
        <GrFromClose
          className="todo-icon"
          onClick={() => removeTodo(todo.id)}
        ></GrFromClose>
        {editable ? (
          <GrFormCheckmark
            className="todo-icon"
            onClick={() => {
              updateTodo({
                todoId: todo.id,
                newValue: content,
              });
              setContent("");
              setEditable(false);
            }}
          />
        ) : (
          <GrFormEdit
            className="todo-icon"
            onClick={() => setEditable(true)}
          ></GrFormEdit>
        )}
      </div>
    </div>
  );
};

export default Todo;
