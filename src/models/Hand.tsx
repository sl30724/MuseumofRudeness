import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Object_3: THREE.Mesh;
  };
  materials: {
    material_0: THREE.MeshStandardMaterial;
  };
};

export function Hand(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/assets/models/hand.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_3.geometry}
        material={materials.material_0}
        position={[-1.42, 1.4, -1.82]}
        rotation={[-1.6, 0.04, -0.97]}
        scale={0.01}
      />
    </group>
  );
}

useGLTF.preload("/assets/models/hand.glb");