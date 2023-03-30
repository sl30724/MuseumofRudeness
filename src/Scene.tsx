import { useRef, useState, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import { useFrame, ThreeElements, useThree } from '@react-three/fiber';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { OrbitControls, Html } from '@react-three/drei';
import Exhibit1 from './Exhibit1';
import "./styles/scene.css"

interface CamControls {
    orbitAbled: boolean;
    // newCamPos: THREE.Vector3;
    cameraTarget: THREE.Vector3;
}

interface ExpoDetails {
    orbitAbled: boolean;
}
let newCamPos = new THREE.Vector3();
let newTarget = new THREE.Vector3();
export default function Scene() {

    const exhibit1Ref = useRef<THREE.Group>(null!);
    const [orbitAbled, setOrbitAbled] = useState(true);



    const handlePauseToggle = () => {
        setOrbitAbled(!orbitAbled);
        newCamPos.set(exhibit1Ref.current.position.x - 5, exhibit1Ref.current.position.y - 1, exhibit1Ref.current.position.z + 2);
        newTarget.set(exhibit1Ref.current.position.x - 2, exhibit1Ref.current.position.y + 1, exhibit1Ref.current.position.z);
    };

    return (
        <>
            <group ref={exhibit1Ref} onClick={() => handlePauseToggle()} position={[1, 0, 0]} name={"e1"}>
                <Exhibit1 />
            </group>
            <ExpoDetails orbitAbled={orbitAbled} />

            <Controls orbitAbled={orbitAbled} cameraTarget={newTarget} />
        </>
    )
};

function Controls(props: CamControls) {
    const controlsRef = useRef<OrbitControlsImpl>(null!);
    let camera = useThree((state) => state.camera);
    let gl = useThree((state) => state.gl);
    useEffect(() => {
        if (controlsRef.current) {
            if (!props.orbitAbled) {
                controlsRef.current.saveState();
            }
            if (props.orbitAbled) {
                controlsRef.current.reset();
            }
        }

    }, [props.orbitAbled, camera])

    useFrame(() => {
        if (!props.orbitAbled) {
            camera.position.lerp(newCamPos, 0.1);
            camera.lookAt(newTarget);
            
        }
    }, -2);

    return (
        <OrbitControls
            makeDefault
            ref={controlsRef}
            enabled={props.orbitAbled}
            mouseButtons={{ LEFT: THREE.MOUSE.PAN, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN }}
            target={props.cameraTarget}
            args={[camera, gl.domElement]}
            enablePan={true}
            enableRotate={false}
            enableZoom={false}
            minDistance={7}
            maxDistance={13}
            // enableDamping={true}
            panSpeed={0.7}
            zoomSpeed={0.5}
        />
    )
}

function ExpoDetails(props: ExpoDetails) {
    const [shown, setShown] = useState(false);
    const [selected, setSelected] = useState("");
    const handleSelected = () => {
        setSelected(HTMLButtonElement.name);
    }

    useEffect(() => {
        if (props.orbitAbled) {
            setShown(false)
        };

        function onTimeout() {
            if (!props.orbitAbled) {
                setShown(true)
            }
        };

        const timeoutId = setTimeout(onTimeout, 1500);

        return () => {
            clearTimeout(timeoutId);
        }
    }, [props.orbitAbled]);

    return (
        <Html {...props} fullscreen={true}>
            <div className={`expoDetails-${shown ? "shown" : "hidden"}`}>
                <h1>Sniff or Blow</h1>
                <p>While in some cultures blowing your nose is considered more acceptable than sniffing, it is commonly considered rude in some cultures to blow your nose loudly in public.</p>
                <h4>It is rude in...</h4>
                <div className="guess">
                    <button className='guess-but' onClick={handleSelected}> Japan </button>
                    <button className='guess-but' onClick={handleSelected}> United Kingdoms </button>
                    <button className='guess-but' onClick={handleSelected}> Norway </button>
                    <button className='guess-but' onClick={handleSelected}> Turkey </button>
                </div>
            </div>
        </Html>
    )
}