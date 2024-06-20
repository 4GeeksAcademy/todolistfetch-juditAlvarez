import React from "react";
import Todolist from "./todolist";

//create your first component
const Home = () => {
  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="col-5">
        <Todolist />
      </div>
    </div>
  );
};

export default Home;
