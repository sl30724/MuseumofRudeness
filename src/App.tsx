import * as THREE from 'three';
import { Canvas, ThreeEvent, useThree, useFrame } from '@react-three/fiber';
import { useState, useRef, useEffect, Suspense } from 'react';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { Icon } from '@iconify/react';
import Exhibit from './Exhibit';
import ExpoDetails from './ExpoDetails';
import Nav from './Nav';
import Loader from './Loader';
import './styles/styles.css';


interface CamControls {
  orbitAbled: boolean;
  // cameraTarget: THREE.Vector3;
}
let to = new THREE.Vector3();
let newTarget = new THREE.Vector3(0, 0, 0);

function App() {

  const [orbitAbled, setOrbitAbled] = useState<boolean>(true);
  const [selectedObj, setSelectedObj] = useState<string>();
  // const [selected3D, setSelected3D] = useState<THREE.Object3D>();

  const [spotTarget1] = useState(() => new THREE.Object3D());
  const [spotTarget2] = useState(() => new THREE.Object3D());
  const [spotTarget3] = useState(() => new THREE.Object3D());
  const [spotTarget4] = useState(() => new THREE.Object3D());
  const [spotTarget5] = useState(() => new THREE.Object3D());

  const handlePauseToggle = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    setOrbitAbled(!orbitAbled);
    setSelectedObj(e.eventObject.name);
    // setSelected3D(e.eventObject);
    to.set(e.eventObject.position.x - 5, e.eventObject.position.y - 0.5, e.eventObject.position.z + 2);
    newTarget.set(e.eventObject.position.x - 2, e.eventObject.position.y + 1, e.eventObject.position.z);
    e.eventObject.updateMatrixWorld();
  };

  const reset = () => {
    setOrbitAbled(true);
  };

  return (
    <div id='scene-container'>
      {/* canvas is responsive to fit the parent node */}
      {/* Canvas sets up a Scene and a Camera.
       Equals to
       const scene = new THREE.Scene()
       const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)

       It also renders the scene every frame */}
      <div className="logo">
        <img src="/logo-horizontal.png" alt="Museum of Rudeness logo" width={140} />
      </div>
      <div className={`exit-${orbitAbled ? "hidden" : "shown"}`}>
        <Icon icon="material-symbols:arrow-back-rounded" className='exit-but' onClick={reset} />
      </div>
      <Nav />
      <ExpoDetails orbitAbled={orbitAbled} selectedObj={selectedObj} />

      <Canvas style={{ background: "#D0C4C3" }} dpr={window.devicePixelRatio} shadows>
        <Suspense fallback={<Loader />}>
          <PerspectiveCamera makeDefault position={[-5, 5, 10]} />
          <ambientLight intensity={0.3} color={"white"} />
          <directionalLight color={"white"} intensity={0.8} position={[-6, 4, -5]} />

          <group position={[0, 0.6, 0]} name={"TissuePaper"} onClick={(e) => handlePauseToggle(e)}>
            <spotLight position={[0, 5, 0]} angle={Math.PI / 4} penumbra={0.6} intensity={0.5} color={"#FFDEAD"} target={spotTarget1} castShadow />
            <primitive object={spotTarget1} position={[0, 1, 0]} />
            <Exhibit eName="TissuePaper" />
          </group>

          <group position={[-4, 0.6, -10]} name={"Hand"} onClick={(e) => handlePauseToggle(e)} receiveShadow castShadow>
            <spotLight position={[0, 5, 0]} angle={Math.PI / 4} penumbra={0.6} intensity={0.5} color={"#FFDEAD"} target={spotTarget2} castShadow />
            <primitive object={spotTarget2} position={[0, 1, 0]} />
            <Exhibit eName="Hand" eScale={0.7} />
          </group>

          <group position={[10, 0.6, -6]} name={"Head"} onClick={(e) => handlePauseToggle(e)} receiveShadow castShadow>
            <spotLight position={[0, 5, 0]} angle={Math.PI / 4} penumbra={0.6} intensity={0.5} color={"#FFDEAD"} target={spotTarget3} castShadow />
            <primitive object={spotTarget3} position={[0, 1, 0]} />
            <Exhibit eName="Head" eScale={0.3} />
          </group>

          <group position={[4, 0.6, -16]} name={"Seat"} onClick={(e) => handlePauseToggle(e)} receiveShadow castShadow>
            <spotLight position={[0, 10, 0]} angle={Math.PI / 6} penumbra={0.6} intensity={0.5} color={"#FFDEAD"} target={spotTarget4} castShadow />
            <spotLight position={[2, 10, 2]} angle={Math.PI / 9} penumbra={0.6} intensity={0.7} color={"#FFDEAD"} target={spotTarget5} castShadow />
            <primitive object={spotTarget4} position={[0, 1, 0]} />
            <primitive object={spotTarget5} position={[0, 3, -1]} />
            <Exhibit eName="Seat" eScale={0.5} />
          </group>

          <mesh position={[0, 0, -20]} rotation={[Math.PI * -0.5, 0, 0]} receiveShadow>
            <planeGeometry attach="geometry" args={[80, 80]} />
            <meshStandardMaterial color={"#A08C8B"} />
          </mesh>

          <Controls orbitAbled={orbitAbled} />
        </Suspense>
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
};

export default App;
