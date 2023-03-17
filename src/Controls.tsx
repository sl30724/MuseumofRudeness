import { useRef, useState, useEffect, Ref, ReactNode, forwardRef } from 'react';
import * as THREE from 'three';
import { Canvas, useThree, useFrame, ThreeElements, extend } from '@react-three/fiber';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { OrbitControls } from '@react-three/drei';
export interface Props {
    clicked: boolean;
}
const Controls = forwardRef<OrbitControlsImpl>(function Controls(props, ref) {

    const { gl, camera } = useThree();
    
    return (
        <OrbitControls
            makeDefault
            ref={ref}
            enabled={true}
            mouseButtons={{ LEFT: THREE.MOUSE.PAN, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN }}
            args={[camera, gl.domElement]}
            enablePan={true}
            enableRotate={false}
            enableZoom={false}
            minDistance={7}
            maxDistance={13}
            enableDamping={true}
            panSpeed={0.5}
            zoomSpeed={0.5}
        />
)
}   )


export default Controls;
// useFrame(() => {
//         if (!orbitEnabled) {
//             controlsRef.current.saveState();
//             controlsRef.current.enabled = orbitEnabled;
//             controlsRef.current.target = newFocus;
//             controlsRef.current.update();
//             // cameraRef.current.dispose();
//         } else if (orbitEnabled) {
//             controlsRef.current.enabled = orbitEnabled;
//             // cameraRef.current.reset();
//             // cameraRef.current.update();
//         }
//         // cameraRef.current.update();
//     }
//     );

// useEffect(()=>{
//     if (orbitEnabled) {
//         cameraRef.current.enabled = orbitEnabled;
//         cameraRef.current.reset();
//         cameraRef.current.update();
//     }
// })
