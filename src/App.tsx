import * as THREE from 'three';
import { Canvas, ThreeEvent, useThree, useFrame } from '@react-three/fiber';
import { useState, useRef, useEffect } from 'react';
import { PerspectiveCamera, OrbitControls, useHelper } from '@react-three/drei';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import Exhibit from './Exhibit';
import ExpoDetails from './ExpoDetails';
import Nav from './Nav';
import './styles/styles.css';


interface CamControls {
  orbitAbled: boolean;
  // cameraTarget: THREE.Vector3;
}
let to = new THREE.Vector3();
let newTarget = new THREE.Vector3(0, 0, 0);

function App() {
  const fov = 50; // AKA Field of View, the width of the camera's view is, in degrees
  // define frustrum
  const near = 0.1; // the near clipping plane, anything closer to the camera than this will be invisible
  const far = 100; // the far clipping plane, anything further away from the camera than this will be invisible
  const [orbitAbled, setOrbitAbled] = useState<boolean>(true);
  const [selectedObj, setSelectedObj] = useState<string>();
  const [selected3D, setSelected3D] = useState<THREE.Object3D>();

  const handlePauseToggle = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    setOrbitAbled(!orbitAbled);
    setSelectedObj(e.eventObject.name);
    setSelected3D(e.eventObject);
    to.set(e.eventObject.position.x - 5, e.eventObject.position.y - 0.5, e.eventObject.position.z + 2);
    newTarget.set(e.eventObject.position.x - 2, e.eventObject.position.y + 1, e.eventObject.position.z);
    e.eventObject.updateMatrixWorld();
  };

  return (
    <div id='scene-container'>
      {/* canvas is responsive to fit the parent node */}
      {/* Canvas sets up a Scene and a Camera.
       Equals to
       const scene = new THREE.Scene()
       const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)

       It also renders the scene every frame */}
      <Nav />
      <ExpoDetails orbitAbled={orbitAbled} selectedObj={selectedObj} />

      <Canvas style={{ background: "#D0C4C3" }} dpr={window.devicePixelRatio} shadows>
        {/* background color can also be set like this */}
        <PerspectiveCamera makeDefault position={[-5, 5, 10]} />

        <ambientLight intensity={0.2} />
        <directionalLight color={"white"} intensity={0.8} position={[-20, 20, -20]} />
        <spotLight position={[-10, 10, -50]} intensity={0.5} color={"#FFDEAD"} />

        <axesHelper args={[5]} />

        <group position={[0, 1, 0]} name={"TissuePaper"} onClick={(e) => handlePauseToggle(e)}>
          {/* <directionalLight position={[0, 4, 0]} intensity={0.3} color={"#FFDEAD"} castShadow /> */}
          <Exhibit eName="TissuePaper" />
        </group>

        <group position={[-4, 1, -10]} name={"Hand"} onClick={(e) => handlePauseToggle(e)} receiveShadow castShadow>
          <Exhibit eName="Hand" />
        </group>

        <mesh position={[0, 0, -20]} rotation={[Math.PI * -0.5, 0, 0]} receiveShadow>
          <planeBufferGeometry attach="geometry" args={[50, 50]} />
          <meshStandardMaterial color={"#A08C8B"} />
        </mesh>

        <Controls orbitAbled={orbitAbled} />

      </Canvas>

    </div>

  );
}

function Controls(props: CamControls) {

  const controlsRef = useRef<OrbitControlsImpl>(null!);
  const { camera } = useThree();
  const { gl } = useThree();

  useEffect(() => {
    if (controlsRef.current) {
      if (!props.orbitAbled) {
        controlsRef.current.saveState();
      } else if (props.orbitAbled) {
        // to = controlsRef.current.position0;
        // newTarget = controlsRef.current.target0;
        controlsRef.current.reset();
      }
    }
  }, [props.orbitAbled]);

  useFrame((state, delta) => {
    if (!props.orbitAbled && controlsRef) {
      state.camera.lookAt(newTarget);
      state.camera.position.lerp(to, 0.05);
      controlsRef.current.target.lerp(newTarget, 0.05);
      state.camera.updateMatrixWorld();
    }
    // else if (props.orbitAbled && controlsRef.current.target!== newTarget && props.start === true) {
    //     // state.camera.lookAt(controlsRef.current.target);
    //     state.camera.position.lerp(to, 0.05);
    //     // controlsRef.current.target.lerp(controlsRef.current.target, 0.05);
    //     state.camera.updateMatrixWorld();
    // }
  });

  return (
    <OrbitControls
      makeDefault
      {...props}
      ref={controlsRef}
      enabled={props.orbitAbled}
      mouseButtons={{ LEFT: THREE.MOUSE.PAN, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN }}
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

export default App;
