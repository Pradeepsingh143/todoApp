import React, { useState } from "react";
import axios from "axios";

function TodoEditForm({ todoId, getTodos }) {
  const [message, setMessage] = useState({ message: "", success: false });

  const [todoEdit, setTodoEdit] = useState({
    title: "",
    task: "",
  });

  const handleEditTodo = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/editTodo/${todoId}`, todoEdit);
      setMessage({ message: "Todo edit successfully", success: true });
      getTodos();
      setTodoEdit({ title: "", task: "" });
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
      <div
        className="modal fade"
        id="todoEditForm"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-dark" id="exampleModalLabel">
                Edit Todo form
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
              <form className="d-flex flex-column gap-3" method="PUT">
                <div>
                  <input
                    type="text"
                    placeholder="Enter your todo title"
                    className="form-control p-2"
                    id="todoTitle"
                    aria-describedby="todoTitle"
                    value={todoEdit.title}
                    onChange={(e) => {
                      setTodoEdit({
                        ...todoEdit,
                        title: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Enter your task"
                    className="form-control p-2"
                    id="task"
                    aria-describedby="task"
                    value={todoEdit.task}
                    onChange={(e) => {
                      setTodoEdit({
                        ...todoEdit,
                        task: e.target.value,
                      });
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleEditTodo}
                >
                  Submit
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

export default TodoEditForm;
