import React, {useEffect, useState } from "react";


const Todolist = () =>{
  const host = "https://playground.4geeks.com/todo";
 const user = "judit_alvarez";


 const [tareas, setTareas] = useState([]);

//  funcion GET
 async function traerTareas (){
    const uri = `${host}/users/${user}`
    const options = {method:"GET"}
    const response = await fetch (uri, options);
    if (!response.ok){
            console.log("ha habido un error",response.status, response.statusText);
     };
     const data = await response.json();
     setTareas(data.todos);
 };
 


 useEffect(()=>{
    traerTareas();
 },[])


    return (
       <>
       <h1>ToDoList</h1>
       <input
        type="text"
        placeholder="escribe una tarea"
        />
        <button>añadir tarea</button>
       <div>
       {tareas.map((item)=>
            <h4>{item.label}</h4>
        )}
       </div>
       </>
    );
};
export default Todolist;