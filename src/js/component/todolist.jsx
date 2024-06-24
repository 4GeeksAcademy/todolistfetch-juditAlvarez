import React, { useEffect, useState } from "react";

const Todolist = () => {
  const host = "https://playground.4geeks.com/todo";
  const [tasks, settasks] = useState([]);
  const [newTaskTask, setnewTaskTask] = useState("");
  const [user, setuser] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  // obtener las tasks de la api
  async function getTask(user) {
    const uri = `${host}/users/${user}`;
    const options = { method: "GET" };
    const response = await fetch(uri, options);
    if (!response.ok) {
      console.log("ha habido un error", response.status, response.statusText);
      return;
    }
    const data = await response.json();
    settasks(data.todos);
  }

  // borrar las tasks
  async function deleteTask(id) {
    const uri = `${host}/todos/${id}`;
    const options = { method: "DELETE" };
    const response = await fetch(uri, options);
    if (!response.ok) {
      console.log("ha habido un error", response.status, response.statusText);
      return;
    }
    // Eliminar
    settasks(tasks.filter((tarea) => tarea.id !== id));
  }

  // añadir nueva tarea
  async function addTask() {
    const uri = `${host}/todos/${user}`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label: newTask, done: false }),
    };
    const response = await fetch(uri, options);
    if (!response.ok) {
      console.log("ha habido un error", response.status, response.statusText);
      return;
    }
    const newTask = await response.json();
    settasks([...tasks, newTask]);
    setnewTaskTask(""); // Limpiar el campo de entrada
  }

  // iniciar sesión o crear user
  async function login() {
    const uri = `${host}/users/${user}`;
    const options = { method: "GET" };
    const response = await fetch(uri, options);
    if (!response.ok) {
      if (response.status === 404) {
        // user no encontrado, crear nuevo user
        const createUser = await fetch(uri, { method: "POST" });
        if (createUser.ok) {
          console.log("user creado:", user);
          setLoggedIn(true);
          getTask(user);
        } else {
          console.log("Error al crear user", createUser.status, createUser.statusText);
        }
      } else {
        console.log("Error al iniciar sesión", response.status, response.statusText);
      }
      return;
    }
    // iniciar sesión
    setLoggedIn(true);
    getTask(user);
  }

  useEffect(() => {
    if (loggedIn) {
      getTask(user);
    }
  }, [loggedIn, user]);

  return (
    <>
      {!loggedIn ? (
        <div className="login-container">
          <h1>Iniciar Sesión</h1>
          <input
            type="text"
            placeholder="Nombre de user"
            value={user}
            onChange={(e) => setuser(e.target.value)}
          />
          <button className="btn btn-primary" onClick={login}>
            Iniciar Sesión
          </button>
        </div>
      ) : (
        <>
          <h1 className="container justify-content-center text-center border border-info bg-primary d-flex justify-content-center">
            ToDoList
          </h1>

          <div className="container overflow-hidden text-center">
            <div className="row gx-5">
              <div className="col">
                <div className="p-3">
                  <input
                    type="text"
                    placeholder="Escribe una tarea"
                    value={newTaskTask}
                    onChange={(e) => setnewTaskTask(e.target.value)}
                  />
                </div>
              </div>
              <div className="col">
                <div className="p-3">
                  <button className="btn btn-info" onClick={addTask}>
                    Añadir tarea
                  </button>
                </div>
              </div>
            </div>

            {tasks.map((item) => (
              <div key={item.id} className="tarea-container">
                <h4>{item.label}</h4>

                <button
                  className="delete-button btn btn-danger"
                  onClick={() => deleteTask(item.id)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Todolist;
