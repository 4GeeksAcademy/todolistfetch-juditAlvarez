import React, { useEffect, useState } from "react";

const Todolist = () => {
  const host = "https://playground.4geeks.com/todo";
  const user = "judit_alvarez";
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");

  // obtener las tareas de la api
  async function traerTareas() {
    const uri = `${host}/users/${user}`;
    const options = { method: "GET" };
    const response = await fetch(uri, options);
    if (!response.ok) {
      console.log("ha habido un error", response.status, response.statusText);
      return;
    }
    const data = await response.json();
    setTareas(data.todos);
  }

  // borrar las tareas
  async function borrarTarea(id) {
    const uri = `${host}/todos/${id}`;
    const options = { method: "DELETE" };
    const response = await fetch(uri, options);
    if (!response.ok) {
      console.log("ha habido un error", response.status, response.statusText);
      return;
    }
    // Eliminar
    setTareas(tareas.filter((tarea) => tarea.id !== id));
  }

  // añadir nueva tarea
  async function agregarTarea() {
    const uri = `${host}/todos/${user}`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label: nuevaTarea, done: false }),
    };
    const response = await fetch(uri, options);
    if (!response.ok) {
      console.log("ha habido un error", response.status, response.statusText);
      return;
    }
    const nueva = await response.json();
    setTareas([...tareas, nueva]);
    setNuevaTarea(""); // Limpiar el campo de entrada
  }

  useEffect(() => {
    traerTareas();
  }, []); //  para que se nada mas cargar la pag se ejecute la funcion

  return (
    <>
      <h1 className="container justify-content-center text-center border border-info bg-primary d-flex justify-content-center">
        ToDoList
      </h1>

      <div class="container overflow-hidden text-center">
        <div class="row gx-5">
          <div class="col">
            <div class="p-3">
              <input
                type="text"
                placeholder="Escribe una tarea"
                value={nuevaTarea}
                onChange={(e) => setNuevaTarea(e.target.value)}
              />
            </div>
          </div>
          <div class="col">
            <div class="p-3">
              {" "}
              <button className="btn btn-info" onClick={agregarTarea}>
                Añadir tarea
              </button>
            </div>
          </div>
        </div>

        {tareas.map((item) => (
          <div key={item.id} className="tarea-container">
            <h4>{item.label}</h4>

            <button
              className="delete-button btn btn-danger"
              onClick={() => borrarTarea(item.id)}
            >
              Xgit add .
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Todolist;
