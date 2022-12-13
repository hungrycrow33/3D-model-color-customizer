import './App.css';
import React, { useState, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {Canvas} from "react-three-fiber";

import { Scene } from "./canvas/Scene";
import { OptionsMenu } from "./components/OptionsMenu";
import ColorsSlider from "./components/ColorsSlider";
import { COLORS } from "./constants/colors";


// function InputRender(file) {
//   useEffect(()=>{
//     setFileURL(URL.createObjectURL(file));
//   },[setFileURL]);
// }

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
  // useEffect(()=>{
  //   setFileURL(URL.createObjectURL(selectedFile));
  // },[setFileURL, selectedFile]);
  
	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);//URL.createObjectURL(event.target.files[0])
		setIsSelected(true);
    
    setFileURL(URL.createObjectURL(event.target.files[0]));

    // const fileReader = new FileReader();
    //setFileURL(fileReader.readAsDataURL(event.target.files[0]));
    //setData(fileReader.readAsArrayBuffer(event.target.files[0]));
    //console.log('data?',JSON.parse(event.target.files[0]));


    // fileReader.readAsDataURL(selectedFile);
    //setData(JSON.parse(event.target.files[0].result));
    
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
	const handleSubmission = async() => {
    
    // var fr = new FileReader();
    // console.log('this is: ', selectedFile.type);
    // var stream = selectedFile.stream();
    // var text = selectedFile.text();
    //var reader = stream.getReader();
    //console.log('and this is: ', stream.json()); //.text()

    //stream.json().then((json) => console.log(json));

    var loader = new GLTFLoader();

    loader.load(fileURL, function(gltf){
      // console.log("secene ",gltf.parser.json.nodes);
      // console.log("assets",gltf.parser.getDependencies("scenes")[1]);
      let numParts = gltf.parser.json.nodes.length;
      
      for(let i=0; i<numParts; i++){
        if(i==0){ // clear the previous array
          setParts([]);
        }
        //console.log("name: ",gltf.parser.json.nodes[i].name);
        setParts(parts => [...parts, gltf.parser.json.nodes[i].name]);
      }
      
      //gltf.nodes;
      
    })
    return setNewMaterialOpt({
      activeOption,
      newMTL:null,
      selectedFile,
      fileURL,
      parts
    });


    // if (selectedFile.type && !selectedFile.type.startsWith('image/')) {
    //   console.log('File is not an image.', selectedFile.type);
      
    // }
    // else{
    //   console.log('eh', selectedFile);
    // }
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

  // when clicking the color, change the color of the parts 
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
           
            {/* <p>lastModifiedDate:{' '}{selectedFile.lastModifiedDate.toLocaleDateString()}</p> */}
          </div>) : (
            <p>Select a file to show details</p>)}
        <div>
        {parts!=[] ? (<p>array: {parts}</p>):(<p>nada</p>)}
          <button onClick={handleSubmission}>Submit</button>
          
          {/*  <img src={selectedFile} /> */}
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