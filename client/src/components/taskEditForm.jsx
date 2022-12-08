import React, { useState } from "react";
import axios from "axios";

function TaskEditForm({ todoId, index, Base_url, getTask }) {
  const [message, setMessage] = useState({ message: "", success: false });
  const [editTask, setEditTask] = useState({ task: "" });

  const handleEditTask = async (e) => {
    e.preventDefault();
    try {
      if (!(editTask.task === "")) {
        await axios.put(`${Base_url}/api/editTask/${todoId}`, editTask, {
          params: { index: index },
        });
        setMessage({ message: "Todo edit successfully", success: true });
        getTask();
        setEditTask({ task: "" });
        setTimeout(() => {
          setMessage({ message: "", success: false });
        }, 2000);
      } else {
        setMessage({ message: "Require some changes", success: true });
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
        id="taskEditForm"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-dark" id="exampleModalLabel">
                Task Edit form
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
                    placeholder="Enter your task"
                    className="form-control p-2"
                    id="task"
                    aria-describedby="task"
                    value={editTask.task}
                    onChange={(e) => {
                      setEditTask({
                        task: e.target.value,
                      });
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleEditTask}
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

export default TaskEditForm;
