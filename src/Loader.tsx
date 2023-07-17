import { Html, useProgress } from '@react-three/drei';
import './styles/loader.css';

export default function Loader() {
  const { progress } = useProgress()
  return <Html fullscreen>
    <div className='loadingScreen'>
    <div className='loadingLogo'>
    <img src="/logo-loading.png" alt="Museum of Rudeness" />
    </div>
    <div className='loadingContent'>
    <p>{Math.round(progress)}%</p>
    <p>LOADED</p>
    </div>
    </div>
    </Html>
}