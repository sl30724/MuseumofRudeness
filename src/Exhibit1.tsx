import { ThreeElements} from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import {  Suspense, ReactNode, forwardRef } from "react";
import * as THREE from "three";
import Tissue from "./Tissuepapper";

interface Props {
    children?: ReactNode
    // any props that come into the component
}
export let orbitEnabled: boolean = true;
export const newFocus = new THREE.Vector3();

export default function Exhibit1() {
    const boxTexture = useTexture('./assets/textures/concrete_wall_008_diff_1k.jpg');
    return (
        // {/* equals to const mesh = new THREE.Mesh() */}
        <>
            <Suspense fallback={null}>
                <Tissue position={[0, 1.5, 0]} />
            </Suspense>
            <mesh position={[0, 0, 0]}>
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
        </>
    );
};

    // const length = 1;
    // const width = 1;
    // const depth = 1;
    // let controls = useThree(state => state.controls!);
    // let [clicked, setClicked] = useState(false);
    // const vec = new THREE.Vector3();


    // {{
    //     map: './assets/textures/concrete_wall_008_diff_1k.jpg',
    //     displacementMap: './assets/textures/concrete_wall_008_disp_1k.jpg',
    //     aoMap: './assets/textures/concrete_wall_008_ao_1k.jpg',
    //     roughnessMap: './assets/textures/concrete_wall_008_rough_1k.jpg',
    //     normalMap: './assets/textures/concrete_wall_008_nor_gl_1k.jpg',
    // })

    // useFrame(state => {
    //     if (clicked === true) {
    //         orbitEnabled = false;
    //         newFocus.set(exhibit1Ref.current.position.x, exhibit1Ref.current.position.y, exhibit1Ref.current.position.z);
    //         state.camera.lookAt(exhibit1Ref.current.position.x, exhibit1Ref.current.position.y, exhibit1Ref.current.position.z)
    //         state.camera.position.lerp(vec.set(0, 0, 0), 0.05);
    //         state.camera.updateMatrixWorld();
    //     }
    //     return { orbitEnabled, newFocus }
    // })

    // useEffect(()=>{
    //     if (clicked === false) {
    //         orbitEnabled = true;
    //     }
    // })

