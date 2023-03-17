import { useRef, useState, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import { useFrame, ThreeElements } from '@react-three/fiber';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import Controls from './Controls';
import Tissue from "./Tissuepapper";
import Exhibit1 from './Exhibit1';

export default function Scene() {
    const controlsRef = useRef<OrbitControlsImpl>(null!);
    const exhibit1Ref = useRef<THREE.Group>(null!);
    const [paused, setPaused] = useState(false);
    const [cameraPosition, setCameraPosition] = useState<THREE.Vector3>();
    const [cameraTarget, setCameraTarget] = useState<THREE.Vector3>();
    let vec = new THREE.Vector3();


    const handlePauseToggle = () => {
        setPaused(!paused);
        //setCameraPosition(exhibit1Ref.current.position);
        // setCameraTarget(exhibit1Ref.current.position);
        if (paused) {
            controlsRef.current.saveState();
            // controlsRef.current.update();
        }
         else if (!paused && controlsRef.current.target0 !== controlsRef.current.target) {
            controlsRef.current.reset();
        }
        // else if (!paused && controlsRef.current.position0 == null) {
        //     controlsRef.current.enabled = true;
        // }
    };

    useEffect(() => {
        console.log(paused, controlsRef.current.enabled, controlsRef.current.position0);
    }, [paused]);

    useFrame((state) => {
        const camera = controlsRef.current.object;
        if (paused) {
            // const camera = controlsRef.current.object;
            controlsRef.current.target = exhibit1Ref.current.position;
            controlsRef.current.enabled = false;
            
            camera.lookAt(exhibit1Ref.current.position);
            camera.position.lerp(vec.set(exhibit1Ref.current.position.x, exhibit1Ref.current.position.y-1, exhibit1Ref.current.position.z+5), 0.05);
            // state.camera.position.lerp(cameraPosition ?, 0.05);
            // state.camera.lookAt(cameraTarget.x, cameraTarget?.y, cameraTarget?.z);
            camera.updateMatrixWorld();
            // controlsRef.current.update();
        } 
        if (!paused && controlsRef.current.target0 !== controlsRef.current.target) {
            // controlsRef.current.reset();
            camera.position.lerp(controlsRef.current.position0, 0.01);
            controlsRef.current.target = controlsRef.current.target0;
            controlsRef.current.enabled = true;
            camera.updateMatrixWorld();           
        }
    });

    return (
        <>
            <group  ref={exhibit1Ref} onClick={() => handlePauseToggle()} position={[1, 0, 0]} name={"e1"}>
                <Exhibit1 />
            </group>
            <Controls ref={controlsRef} />
        </>
    )
};

