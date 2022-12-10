// Renders chair model
// Extension of the model: .gltf(JSON) or .glb(Binary)

import React from "react";
import {useRef, useEffect} from "react";
import * as THREE from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"
import {useLoader} from "react-three-fiber";

const INITIAL_MTL = new THREE.MeshPhongMaterial({
    color: new THREE.Color(0xf1f1f1),
    shininess: 10
});

const INITIAL_MAP = [
    {childID: "back", mtl: INITIAL_MTL},
    {childID: "base", mtl: INITIAL_MTL},
    {childID: "cushions", mtl: INITIAL_MTL},
    {childID: "legs", mtl: INITIAL_MTL},
    {childID: "supports", mtl: INITIAL_MTL}
    ];

const initColor = (parent, type, mtl) => {
    parent.traverse(o => {
        if (o.isMesh && o.name.includes(type)) {
            o.castShadow = true;
            o.receiveShadow = true;
            o.material = mtl;
            o.nameID = type;
        }
    });
}

const ChairMesh = ({newMaterialOpt}) => {
    // load information about the model in theModel
    //const {scene: theModel} = useLoader(GLTFLoader, "chair.gltf");
    // var filePath ="chair.gltf"
    // if (newMaterialOpt.fileURL){
    //     filePath = newMaterialOpt.fileURL
    //     console.log("been here")
    //   }
    const {scene: theModel} = useLoader(GLTFLoader, newMaterialOpt.fileURL);
    
    const chair = useRef(theModel)

    useEffect(() =>
            void setMaterial(newMaterialOpt.activeOption, newMaterialOpt.newMTL)
        , [newMaterialOpt.newMTL])

    useEffect(() => {
        if (theModel) {
            for (let object of INITIAL_MAP) {
                initColor(theModel, object.childID, object.mtl);
            }
        }
    }, [theModel])

    const setMaterial = (type, mtl) => {
        theModel.traverse(o => {
            if (o.isMesh && o.nameID != null) {
                if (o.nameID === type) {
                    o.material = mtl;
                }
            }
        });
    }

    // <primitive/> to provide the created obj to scene
    return <primitive
        ref={chair}
        object={theModel}
        scale={[2, 2, 2]}
        rotation={[0, Math.PI, 0]}
        position={[0, -1, 0]}
        receiveShadow
        castShadow
    >
    </primitive>

}

export default ChairMesh;
