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
  const [selectedFile, setSelectedFile] = useState(null);
	const [isSelected, setIsSelected] = useState(false);
  const [fileURL, setFileURL] = useState("donut.gltf");
  const [newMaterialOpt, setNewMaterialOpt] = useState({
    activeOption,
    newMTL: null,
    selectedFile,
    fileURL
  });
  
  
  const [parts, setParts] = useState([]); // list of distinctive parts to color (layers from the file) 

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);//URL.createObjectURL(event.target.files[0])
		setIsSelected(true);
    setFileURL(URL.createObjectURL(event.target.files[0]));
    // const fileReader = new FileReader();
    // fileReader.readAsDataURL(selectedFile);
    //setData(JSON.parse(event.target.files[0].result));
    //console.log("here",URL.createObjectURL(event.target.files[0]));
    
        // console.log("ahhhhhh", JSON.parse(event.target.files[0].result));

    // fileReader.onloadend = ()=>{
    //   try{
    //     setData(JSON.parse(fileReader.result));
    //     console.log("ahhhhhh", data);
    //     // setErrorData(null)      
    //   }catch(e){
    //     console.log("e.target.result", event.target.result);
    //     // setErrorData("**Not valid JSON file!**");
    //  }
    //  if( event.target.files[0]!== undefined)
    //   fileReader.readAsText(event.target.files[0]);
    // }
    
	};

  const readImage=(selectedFile)=> {
    // Check if the file is an image.
    if (selectedFile.type && !selectedFile.type.startsWith('image/')) {
      console.log('File is not an image.', selectedFile.type);
      return;
    }
  };
	const handleSubmission = () => {
    if (selectedFile.type && !selectedFile.type.startsWith('image/')) {
      console.log('File is not an image.', selectedFile.type);
      
    }
    else{
      console.log('eh', selectedFile);
    }
    // const formData = new FormData();
    // formData.append('File', selectedFile);
    
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
        <input type="file" name="file" accept=".gltf, .glb" onChange={changeHandler} />
        {isSelected ? (
          <div>
            <p>Filename: {selectedFile.name}</p>
            <p>Filetype: {selectedFile.type}</p>
            <p>Size in bytes: {selectedFile.size}</p>
            <p>Size in bytes: {selectedFile.dirName}</p>
            {/* <p>lastModifiedDate:{' '}{selectedFile.lastModifiedDate.toLocaleDateString()}</p> */}
          </div>) : (
            <p>Select a file to show details</p>)}
        <div>
          <button onClick={handleSubmission}>Submit</button>
          
          {/*  <img src={selectedFile} /> */}
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