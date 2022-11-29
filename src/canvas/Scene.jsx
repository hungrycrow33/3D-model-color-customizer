// 
import React, {Suspense, useEffect} from "react";
import * as THREE from "three";
import {extend, useThree} from "react-three-fiber";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import ChairMesh from "./components/ChairMesh";
import Floor from "./components/Floor";

// Add controls by third-party OrbitControls.js
extend({OrbitControls})

export const Scene = ({newMaterialOpt}) =>{
    const{
        scene, camera,
        gl: {domElement}
    }= useThree();

    useEffect(() => {
        scene.background = new THREE.Color(0xf1f1f1);
        scene.fog = new THREE.Fog(0xf1f1f1, 20, 100);
        camera.fov = 50;
    }, [])

    return(
        <>
            <orbitControls args={[camera, domElement]}/>
            <hemisphereLight
                skycolor={new THREE.Color(0xffffff)}
                groundColor={new THREE.Color(0xffffff)}
                intensity={0.61}
                position={[0, 50, 0]}
            />
            <directionalLight
                color={new THREE.Color(0xffffff)}
                intensity={0.54}
                position={[-8, 12, 8]}
                castShadow
            />
            <Suspense fallback={null}>
                <ChairMesh newMaterialOpt={newMaterialOpt}/>
                <Floor/>
            </Suspense>
        </>)
}