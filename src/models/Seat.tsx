import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Cube012: THREE.Mesh;
    Cube012_1: THREE.Mesh;
  };
  materials: {
    LP: THREE.MeshPhysicalMaterial;
    ["METAL.005"]: THREE.MeshStandardMaterial;
  };
};

export function Seat(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/assets/models/seat.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <group scale={0.23}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube012.geometry}
          material={materials.LP}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube012_1.geometry}
          material={materials["METAL.005"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/assets/models/seat.glb");