import React, { useState, useEffect} from "react";
import "../utiles/style.css";
import Todoform from "../components/TodoForm";
import Todos from "../components/Todos";
import axios from "axios";
import Task from "../components/Task";

const Home = () => {
  const [todo, setTodo] = useState();
  const [task, setTask] = useState();
  const [searchText, setSearchText] = useState({ text: "" });
  const [searchTodo, setSearchTodo] =useState();

  const getUserTodos = async () => {
    try {
      const userObj = await JSON.parse(sessionStorage.getItem("userDetails"));
      const { data } = await axios.get(`/api/todos`, {
        params: { userId: userObj.$id },
      });
      setTodo(data);
      setSearchTodo(data)
    } catch (error) {
      console.log(error);
    }
  };

  const getTask = async () => {
    const taskData = await axios.get(`/api/getTask/${task._id}`);
    setTask(taskData.data.myTask[0]);
  };

  const handleSearch = async (e) => {
    const todosObj = searchTodo.user[0].todos;
    const search = todosObj.filter(
      (el) =>
        el.task.includes(searchText.text.toLowerCase()) ||
        el.title.toLowerCase().includes(searchText.text.toLowerCase())
    );
    setTodo((pre) => ({
      ...pre,
      user: [
        {
          ...pre.user[0],
          todos: search,
        }
      ]
    }));
  };

  const handleSort = async () => {
    getUserTodos();
    const sortedTask = task.task.sort();
    console.log(sortedTask);
    setTask({ ...task, task: sortedTask });
  };

  // console.log(task);

  useEffect(() => {
    getUserTodos();
  }, []);

  return (
    <>
      <section className="container d-flex">
        <aside
          className="left-col col-3 p-3 border-start border-end"
          style={{ minHeight: "100vh" }}
        >
          <div className="d-flex search-box">
            <input
              type="search"
              id="search-todo"
              name="search-todo"
              placeholder="Search Todo"
              className="w-100 p-2 px-3 border-0 rounded-start"
              onChange={(e) => {
                setSearchText({ text: e.target.value });
              }}
            />
            {/* <input type="submit" className='border-0 rounded-end'/> */}
            <button className="border-0 rounded-end" onClick={handleSearch}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
          <Todoform getTodos={getUserTodos}  />
          <Todos
            todo={todo}
            setTask={setTask}
            getTodos={getUserTodos}
          />
          {/* // Here our all of the title needs to be placed */}
        </aside>

        {/* task heading */}
        <div className="task right-col p-3 px-4 col-9">
          <div
            className="px-3 py-1 rounded d-flex justify-content-between align-items-center gap-4"
            style={{ backgroundColor: "#6c757d" }}
          >
            <h5 className="m-0 fw-normal fs-5 flex-grow-1">Task</h5>
            <button
              type="button"
              className="btn btn-secondary border-0"
              onClick={handleSort}
            >
              Sort <i className="fa-solid fa-sort bg-transparent"></i>
            </button>
          </div>
          <Task
            getTodos={getUserTodos}
            todoTask={task}
            setTask={setTask}
            getTask={getTask}
          />
          <p className="mt-4 fs-5">
            {task ? "" : "Click on title to preview task"}
          </p>
        </div>
      </section>
    </>
  );
};

export default Home;
