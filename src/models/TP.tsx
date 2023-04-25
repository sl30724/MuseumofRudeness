import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Object_4: THREE.Mesh;
    Object_5: THREE.Mesh;
  };
  materials: {
    tissuePaper: THREE.MeshStandardMaterial;
    ["tissuePaper-1"]: THREE.MeshStandardMaterial;
  };
};

export function TissuePaper(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/assets/models/tissuePaper.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group scale={2}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_4.geometry}
              material={materials.tissuePaper}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_5.geometry}
              material={materials["tissuePaper-1"]}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/assets/models/tissuePaper.glb");