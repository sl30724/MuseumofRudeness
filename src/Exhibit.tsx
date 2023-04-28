import { useTexture } from "@react-three/drei";
import { ReactNode } from "react";
import { Vector3, Euler } from "@react-three/fiber";
// import * as THREE from "three";
// import Loader from "./Loader";
import { TissuePaper } from "./models/TP";
import { Hand } from "./models/Hand";
import { Head } from "./models/Head";
import { Seat } from "./models/Seat";

interface ExhibitType {
    children?: ReactNode;
    eName: string;
    eScale?: number | undefined; 
    ePosition?: Vector3 | undefined; //position for inmorted glb
    eRotation?: Euler | undefined;
    gPosition?: Vector3 | undefined;
}

export default function Exhibit(props: ExhibitType) {
    const boxTexture = useTexture('./assets/textures/concrete_wall_008_diff_1k.jpg');
    return (
        // {/* equals to const mesh = new THREE.Mesh() */}
        <group position={props.gPosition}>
            {props.eName==="TissuePaper" && <TissuePaper position={[0, 1.5, 0]}/>}
            {props.eName==="Hand" && <Hand position={[0, 0.5, 0]} scale={props.eScale}/>}
            {props.eName==="Head" && <Head position={[0, 2, 0]} scale={props.eScale}/>}
            {props.eName=== "Seat" && <Seat position={[0, 1.5, 0]} scale={props.eScale}/>}
            {/* <Suspense fallback={null} >
                <mesh receiveShadow castShadow>
                <Loader gName={props.eName} position={props.ePosition} scale={props.eScale} ></Loader>
                </mesh>
            </Suspense> */}
            <mesh position={[0, 0, 0]} castShadow receiveShadow>
                {/* defines the shape, equals new THREE.BoxGeometry(2, 2, 2) */}
                <cylinderGeometry args={[2, 2, 0.5, 200]} />
                {/* defines the surface look of the mesh,
          meshBasicMaterial = not affected by lights
          meshStandardMaterial = affected by lights */}
                <meshStandardMaterial
                    map={boxTexture}
                    // normalMap-encoding={LinearEncoding}
                    transparent
                    flatShading={true} />
            </mesh>
        </group>
    );
};