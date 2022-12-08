import React, { useState } from "react";
import axios from "axios";

function Todoform({ getTodos, Base_url }) {
  const [message, setMessage] = useState({ message: "", success: false });

  const [todo, setTodo] = useState({
    title: "",
    task: "",
    userId: "",
  });

  async function handleGetUserId() {
    const userObj = await JSON.parse(sessionStorage.getItem("userDetails"));
    setTodo({ ...todo, userId: userObj.$id });
    setMessage({ message: "", success: false });
  }

  const handleAddTodo = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${Base_url}/api/todoCreate`, todo);
      setMessage({ message: "Todo successfully created", success: true });
      getTodos();
      setTodo({ ...todo, title: "", task: "" });
      setTimeout(() => {
        setMessage({ message: "", success: false });
      }, 2000);
    } catch (err) {
      console.log(err);
      console.log(err.message);
      setMessage({ message: err.response.data, success: false });
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-secondary w-100 mt-2"
        data-bs-toggle="modal"
        data-bs-target="#todoForm"
        onClick={handleGetUserId}
      >
        <i className="fa-solid fa-square-plus"></i> Create Todo
      </button>

      <div
        className="modal fade"
        id="todoForm"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-dark" id="exampleModalLabel">
                Todo form
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* <!-- Modal --> */}
              <form className="d-flex flex-column gap-3" method="POST">
                <div>
                  <input
                    type="text"
                    placeholder="Enter your todo title"
                    className="form-control p-2"
                    id="todoTitle"
                    aria-describedby="todoTitle"
                    value={todo.title}
                    onChange={(e) => {
                      setTodo({
                        ...todo,
                        title: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <input
                    type="task"
                    placeholder="Enter your task"
                    className="form-control p-2"
                    id="task"
                    aria-describedby="task"
                    value={todo.task}
                    onChange={(e) => {
                      setTodo({
                        ...todo,
                        task: e.target.value,
                      });
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleAddTodo}
                >
                  Add Todo
                </button>
                  {message.success ? (
                    <p className="text-success">{message.message}</p>
                  ) : (
                    <p className="text-danger">{message.message}</p>
                  )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todoform;
