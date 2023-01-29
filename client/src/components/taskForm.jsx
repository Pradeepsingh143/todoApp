import React, { useState } from "react";
import axios from "axios";

function taskForm({ todoId, getTask }) {
  const [message, setMessage] = useState({ message: "", success: false });
  const [addTask, setAddTask] = useState({ task: "" });
  
  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      if (!(addTask.task === "")) {
        await axios.post(`/api/createTask/${todoId}`, addTask);
        setMessage({ message: "Todo Added successfully", success: true });
        getTask();
        setAddTask({ task: "" });
        setTimeout(() => {
          setMessage({ message: "", success: false });
        }, 2000);
      } else {
        setMessage({ message: "Task is required", success: true });
      }
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
        id="taskForm"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-dark" id="exampleModalLabel">
                Create Task form
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
                    placeholder="Enter your task"
                    className="form-control p-2"
                    id="task"
                    aria-describedby="task"
                    value={addTask.task}
                    onChange={(e) => {
                      setAddTask({
                        task: e.target.value,
                      });
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleCreateTask}
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

export default taskForm;
