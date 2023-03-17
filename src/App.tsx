import { useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useThree, useFrame} from '@react-three/fiber';
import { CameraControls, PerspectiveCamera } from '@react-three/drei';
import { MathUtils } from 'three';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import Scene from './Scene';


function App() {
  const fov = 50; // AKA Field of View, the width of the camera's view is, in degrees
  // define frustrum
  const near = 0.1; // the near clipping plane, anything closer to the camera than this will be invisible
  const far = 100; // the far clipping plane, anything further away from the camera than this will be invisible
  // const rotateX = MathUtils.degToRad(90);

  return (
    // canvas is responsive to fit the parent node
    <div id='scene-container'>
      {/* Canvas sets up a Scene and a Camera.
       Equals to
       const scene = new THREE.Scene()
       const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)

       It also renders the scene every frame */}
      <Canvas camera={{position:[-5, 5, 10], fov:fov, near: near, far:far}}style={{ background: "#D0C4C3" }} dpr={window.devicePixelRatio}>
        {/* background color can also be set like this */}
        <ambientLight intensity={0.2} />
        <directionalLight color={"white"} intensity={0.8} position={[-10, 10, 10]} />
        <axesHelper args={[5]} />
        <Scene />
      </Canvas>

    </div>
  );
}

export default App;
