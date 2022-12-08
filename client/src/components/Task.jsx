import React, { useState } from "react";
import axios from "axios";
import TaskEditForm from "./taskEditForm";
import TaskForm from "./taskForm";

const Task = ({ todoTask, setTask, Base_url, getTask }) => {
  const [taskIndex, setTaskIndex] = useState();

  const handleDeleteTask = async (index) => {
    try {
      await axios.delete(`${Base_url}/api/deleteTask/${todoTask._id}`, {
        params: { index: index },
      });
      getTask();
    } catch (err) {
      console.log(err);
      console.log(err.message);
    }
  };

  return (
    <>
      {todoTask &&
        todoTask.task.map((task, index) => (
          <div
            key={index}
            className="task-list px-3 mt-3 rounded d-flex justify-content-between align-items-center gap-4 p-1"
            style={{ backgroundColor: "rgba(108, 117, 125, 0.3)" }}
          >
            <h5 className="m-0 fw-normal fs-6 flex-grow-1">{task}</h5>
            <div className="d-flex gap-3 align-items-center">
              {/* edit button start*/}
              <button
                type="button"
                className="bg-transparent border-0 text-white"
                data-bs-toggle="modal"
                data-bs-target="#taskEditForm"
                onClick={() => setTaskIndex(index)}
              >
                <i
                  style={{ cursor: "pointer" }}
                  className="icon fa-regular fa-pen-to-square"
                ></i>
              </button>
              <TaskEditForm
                todoId={todoTask._id}
                index={taskIndex}
                Base_url={Base_url}
                setTask={setTask}
                getTask={getTask}
              />
              {/* edit button end*/}

              <button
                className="border-0 bg-transparent"
                onClick={() => handleDeleteTask(index)}
              >
                <i
                  style={{ cursor: "pointer" }}
                  className="icon fa-solid fa-trash-can"
                ></i>
              </button>
            </div>
          </div>
        ))}
      <p className="mt-4 fs-5">{todoTask && todoTask.task.length === 0 ? "No task available to preview" : ""}</p>
      {todoTask && 
      <div className="d-flex justify-content-end mt-4">
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#taskForm"
      >
        <i className="fa-solid fa-square-plus"></i> Add Task
      </button>
      <TaskForm
        todoId={todoTask._id}
        Base_url={Base_url}
        getTask={getTask}
      />
    </div>}
    </>
  );
};

export default Task;
