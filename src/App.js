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
  const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState(false);

	const changeHandler = (event) => {
		setSelectedFile(URL.createObjectURL(event.target.files[0]));//event.target.files[0]);
		setIsSelected(true);
	};

	const handleSubmission = () => {
    const formData = new FormData();
    formData.append('File', selectedFile);
    
  //   fetch('localhost:3000/', {
  //     method: 'POST',
  //     body: formData
  //   })
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log('Success:', result);
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
	};

  const selectSwatch = (e) => {
    let color = COLORS[parseInt(e.target.dataset.key)];
    let newMTL;
    // if (color.texture) { //to change texture
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
      console.log(color);
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
      <div>
        <input type="file" name="file" onChange={changeHandler} />
        {isSelected ? (
          <div>
            <p>Filename: {selectedFile.name}</p>
            <p>Filetype: {selectedFile.type}</p>
            <p>Size in bytes: {selectedFile.size}</p>
            {/* <p>lastModifiedDate:{' '}{selectedFile.lastModifiedDate.toLocaleDateString()}</p> */}
          </div>) : (
            <p>Select a file to show details</p>)}
        <div>
          <button onClick={handleSubmission}>Submit</button>
           <img src={selectedFile} />
        </div>
      </div>
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