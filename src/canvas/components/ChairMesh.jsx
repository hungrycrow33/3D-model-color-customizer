// Renders chair model
// Extension of the model: .gltf(JSON) or .glb(Binary)

import React from "react";
import {useRef, useEffect} from "react";
import * as THREE from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"
import {useLoader} from "react-three-fiber";

const ChairMesh = ({newMaterialOpt}) => {
    // load information about the model in theModel
    const {scene: theModel} = useLoader(GLTFLoader, "chair.gltf");
    const chair = useRef(theModel)

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
