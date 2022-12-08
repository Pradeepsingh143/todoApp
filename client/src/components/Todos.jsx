import React, { useState } from "react";
import TodoEditForm from "./todoEditForm";
import axios from "axios";

function Todos({ todo, setTask, getTodos, Base_url }) {
  const [todoId, setTodoId] = useState();

  const handleDeleteTodo = async (todos) => {
    try {
      const userObj = await JSON.parse(sessionStorage.getItem("userDetails"));
      await axios.delete(
        `${Base_url}/api/deleteTodo/${todos._id}/${userObj.$id}`
      );
      getTodos();
    } catch (error) {
      console.log(`Error: ${error.message}`);
      console.log(error);
    }
  };

  return (
    <>
      <div className="mt-4">
        {todo &&
          todo.user[0].todos.map((todos, index) => (
            <div
              className="px-2 py-1 mt-2 rounded"
              key={index}
              style={{ background: "#3a4146" }}
            >
              <div className="title d-flex mt-2 align-items-center">
                <div className="flex-grow-1 align-items-center">
                  <h2
                    className="grow-1 text-capitalize"
                    style={{ cursor: "pointer", fontSize: "17px" }}
                    onClick={() => {
                      getTodos()
                      setTask(todos);
                    }}
                  >
                    {todos.title}
                  </h2>
                </div>
                <div className="d-flex gap-1 align-items-center">
                  {/* todo edit form */}
                  {/* todo edit form */}
                  <button
                    type="button"
                    className="bg-transparent border-0 text-white"
                    data-bs-toggle="modal"
                    data-bs-target="#todoEditForm"
                    onClick={() => setTodoId(todos._id)}
                  >
                    <i
                      style={{ cursor: "pointer" }}
                      className="icon fa-regular fa-pen-to-square"
                    ></i>
                  </button>
                  <TodoEditForm
                    todoId={todoId}
                    getTodos={getTodos}
                    Base_url={Base_url}
                  />
                  {/* todo edit form end*/}
                  {/* todo edit form end*/}

                  <button
                    className="bg-transparent border-0 text-white"
                    onClick={() => handleDeleteTodo(todos)}
                  >
                    <i
                      style={{ cursor: "pointer" }}
                      className="icon fa-solid fa-trash-can"
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        {todo && todo.user[0].todos.length === 0 ? "Nothing to preview" : ""}
        {!todo ? "Need to Login to create todos" : ""}
      </div>
    </>
  );
}

export default Todos;
