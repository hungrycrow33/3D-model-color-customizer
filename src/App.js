
import './App.css';
import React, { useState } from "react";
import { Scene } from "./canvas/Scene";
import * as THREE from "three";
import {Canvas} from "react-three-fiber";

function App() {
  // const [activeOption, setActiveOption] = useState("legs");
  // const [newMaterialOpt, setNewMaterialOpt] = useState({
  //   activeOption,
  //   newMTL: null
  // });

  return (
    <div className="App">
      <header className="App-header">    
        
      </header>

      <Canvas id ="rtfCanvas">

        <Scene  />
      </Canvas>
    </div>
  );
}

export default App;
