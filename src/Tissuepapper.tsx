
import { ThreeElements, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


export default function Tissue(props: ThreeElements['mesh']) {
    const result = useLoader(GLTFLoader, '/assets/models/tissuePaper.glb')
    return <primitive 
    object={result.scene}
    {...props}
    />
}