import { Component } from "solid-js";
import CPUinfo from "./components/CPUinfo";
import Memory from "./components/Memory";
import Network from "./components/Network";

const App: Component = () => {
  return (
    <div class="mt-4">
      <CPUinfo />
      <div class="flex">
        <Memory />
        <Network />
      </div>
    </div>
  );
};

export default App;
