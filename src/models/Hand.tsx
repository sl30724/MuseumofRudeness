import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Object_2: THREE.Mesh;
  };
  materials: {
    ["Scene_-_Root"]: THREE.MeshStandardMaterial;
  };
};

export function Hand(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("assets/models/hand.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group scale={0.05}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_2.geometry}
            material={materials["Scene_-_Root"]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("assets/models/hand.glb");