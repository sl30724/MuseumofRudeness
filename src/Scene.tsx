import { useRef, useState, useEffect } from 'react';
// import * as THREE from 'three';
// import { events, Object3DNode, ThreeEvent, useFrame, useThree, Vector3 } from '@react-three/fiber';
// import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
// import { OrbitControls, Select, useSelect } from '@react-three/drei';
// import Exhibit from './Exhibit';
// import ExpoDetails from './ExpoDetails';
// import "./styles/scene.css"
// import { Object3D } from 'three';



// let to = new THREE.Vector3();
// let newTarget = new THREE.Vector3(0, 0, 0);

// export default function Scene() {

//     const handlePauseToggle = (e: ThreeEvent<MouseEvent>) => {
//         e.stopPropagation();
//         setOrbitAbled(!orbitAbled);
//         to.set(e.eventObject.position.x - 5, e.eventObject.position.y - 0.5, e.eventObject.position.z + 2);
//         newTarget.set(e.eventObject.position.x - 2, e.eventObject.position.y + 1, e.eventObject.position.z);
//         e.eventObject.updateMatrixWorld();
//         // to.set(exhibit1Ref.current.position.x - 5, exhibit1Ref.current.position.y - 0.5, exhibit1Ref.current.position.z + 2);
//         // newTarget.set(exhibit1Ref.current.position.x - 2, exhibit1Ref.current.position.y + 1, exhibit1Ref.current.position.z);
//     };

//     const changeCursor = () => {

//     }

//     return (
//         <>
//             <group position={[0, 0, 0]} name={"e1"}  onClick={(e) => handlePauseToggle(e)}>
//                 <Exhibit eName="tissuePaper" ePosition={[0, 1.5, 0]} />
//             </group>
//             <group position={[-6, 0, -12]} onClick={(e) => handlePauseToggle(e)}>
//                 <Exhibit eName="hand3" ePosition={[0, 0.5, 0]} />
//             </group>
//             <Controls orbitAbled={orbitAbled} />
//         </>
//     )
// };

