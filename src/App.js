import './App.css';
import React, { useState, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {Canvas} from "react-three-fiber";

import { Scene } from "./canvas/Scene";
import { OptionsMenu } from "./components/OptionsMenu";
import ColorsSlider from "./components/ColorsSlider";
import { COLORS } from "./constants/colors";


function App() {
  const [activeOption, setActiveOption] = useState("legs");
  const [selectedFile, setSelectedFile] = useState(null);
	const [isSelected, setIsSelected] = useState(false);
  const [fileURL, setFileURL] = useState("chair.gltf");
  const [data, setData] = useState(null);
  const [parts, setParts] = useState([ "legs", "cushions", "back", "supports", "base" ]); // list of distinctive parts to color (layers from the file) 

  const [newMaterialOpt, setNewMaterialOpt] = useState({
    activeOption,
    newMTL: null,
    selectedFile,
    fileURL,
    parts
  });
  
  // when new file uploaded, set new file & fileURL
	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
    setFileURL(URL.createObjectURL(event.target.files[0])); //handlesubmission으로?
	};

  // when clicking submit, set newMaterialOpt with new parts array
	const handleSubmission = () => {
    var loader = new GLTFLoader();
    loader.load(fileURL, function(gltf){
      let numParts = gltf.parser.json.nodes.length;
      for(let i=0; i<numParts; i++){
        if(i==0){ // clear the previous array
          setParts([]);
        }
        setParts(parts => [...parts, gltf.parser.json.nodes[i].name]);
      }
    })
    return setNewMaterialOpt({
      activeOption,
      newMTL:null,
      selectedFile,
      fileURL,
      parts
    });
	};

  // when clicking the color, change the color of the parts 
  const selectSwatch = (e) => {
    let color = COLORS[parseInt(e.target.dataset.key)];
    let newMTL;
    //to change texture
    /* if (color.texture) { 
    //   let txt = new THREE.TextureLoader().load(color.texture);

    //   txt.repeat.set(color.size[0], color.size[1], color.size[2]);
    //   txt.wrapS = THREE.RepeatWrapping;
    //   txt.wrapT = THREE.RepeatWrapping;

    //   newMTL = new THREE.MeshPhongMaterial({
    //     map: txt,
    //     shininess: color.shininess ? color.shininess : 10
    //   });
    // } else { */
      newMTL = new THREE.MeshPhongMaterial({
        color: parseInt("0x" + color.color),
        shininess: color.shininess ? color.shininess : 10
      });
      console.log(color);
    // }

    return setNewMaterialOpt({
      activeOption,
      newMTL,
      selectedFile,
      fileURL,
      parts
    });
  };

  return (
    <div className="App">
      <header className="App-header">    
      </header>
      <div>
        <input type="file" name="file" accept=".gltf, .glb" onChange={changeHandler} />
        {isSelected ? (
          <div>
            <p>Filename: {selectedFile.name}</p>
            <p>Filetype: {selectedFile.type}</p>
            <p>Size in bytes: {selectedFile.size}</p>
            <p>Size in bytes: {selectedFile.dirName}</p>
           
          </div>) : (
            <p>Select a file to show details</p>)}
        <div>
        {parts!=[] ? (<p>array: {parts}</p>):(<p>nada</p>)}
          <button onClick={handleSubmission}>Submit</button>
        </div>
      </div>
      <OptionsMenu
        activeOption={activeOption}
        setActiveOption={setActiveOption}
        parts = {parts}
      />

      <Canvas id ="rtfCanvas">
        <Scene newMaterialOpt={newMaterialOpt}/>
      </Canvas>

      <ColorsSlider selectSwatch={selectSwatch} />
    </div>
  );
}

export default App;