
import './App.css';
import React, { useState } from "react";
import * as THREE from "three";
import {Canvas} from "react-three-fiber";

import { Scene } from "./canvas/Scene";
import { OptionsMenu } from "./components/OptionsMenu";
import ColorsSlider from "./components/ColorsSlider";
import { COLORS } from "./constants/colors";

function App() {
  const [activeOption, setActiveOption] = useState("legs");
  const [newMaterialOpt, setNewMaterialOpt] = useState({
    activeOption,
    newMTL: null
  });

  const selectSwatch = (e) => {
    let color = COLORS[parseInt(e.target.dataset.key)];
    let newMTL;
    // if (color.texture) {
    //   let txt = new THREE.TextureLoader().load(color.texture);

    //   txt.repeat.set(color.size[0], color.size[1], color.size[2]);
    //   txt.wrapS = THREE.RepeatWrapping;
    //   txt.wrapT = THREE.RepeatWrapping;

    //   newMTL = new THREE.MeshPhongMaterial({
    //     map: txt,
    //     shininess: color.shininess ? color.shininess : 10
    //   });
    // } else {
      newMTL = new THREE.MeshPhongMaterial({
        color: parseInt("0x" + color.color),
        shininess: color.shininess ? color.shininess : 10
      });
    // }

    return setNewMaterialOpt({
      activeOption,
      newMTL
    });
  };

  return (
    <div className="App">
      <header className="App-header">    
      </header>

      <OptionsMenu
        activeOption={activeOption}
        setActiveOption={setActiveOption}
      />

      <Canvas id ="rtfCanvas">
        <Scene newMaterialOpt={newMaterialOpt}/>
      </Canvas>

      <ColorsSlider selectSwatch={selectSwatch} />
    </div>
  );
}

export default App;
