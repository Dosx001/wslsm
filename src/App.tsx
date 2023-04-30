import { Component } from "solid-js";
import CPUinfo from "./components/CPUinfo";
import Memory from "./components/Memory";

const App: Component = () => {
  return (
    <div>
      <CPUinfo />
      <Memory />
    </div>
  );
};

export default App;
