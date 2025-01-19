import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Leva, useControls } from 'leva';
import '../styles/traffic.css'

import CanvasLoader from '../components/canvasLoader.jsx';

// import Desk from '../components/Zombie/desk.jsx';
// import DeadGirl from '../components/Zombie/DeadGirl.jsx';
import Bed from '../components/Zombie/Bed.jsx';
import Zombie from '../components/Zombie.jsx';




const Hospital = () => {

  const control = useControls('TrafficRoad',{
    scale:{
      value:2.5,
      min:-10,
      max:10
    },
    rotationX:{
      value:0,
      min:-10,
      max:10
    },
    rotationY:{
      value:0,
      min:-10,
      max:10
    },
    rotationZ:{
      value:0,
      min:-10,
      max:10
    },
    positionX:{
      value:0,
      min:-10,
      max:10
    },
    positionY:{
      value:0,
      min:-100,
      max:100
    },
    positionZ:{
      value:0,
      min:-200,
      max:100
    }
  })


  return (
    <div className="canvas-container">

        <Leva/> 
        <Canvas>
            <Suspense fallback={<CanvasLoader />}>
                
                <PerspectiveCamera makeDefault position={[0, 0, 30]} />

                  <OrbitControls 
                    maxPolarAngle={(85 * Math.PI) / 180}
                    minDistance={5}
                    maxDistance={50}
                  />

                  <Bed 
                    scale={7.7}
                    rotation={[0,0, 0]}
                    position={[-10,0,0]} 
                  />

                  <Zombie
                    scale={3.5}
                    rotation={[0, -0.6, 0]}
                    position={[2,-4,-9]}
                  />





                <ambientLight intensity={0.5} />
                <directionalLight intensity={0.5} position={[10, 10, 10]} />


            </Suspense>
        </Canvas>
      
  </div>
  
  );

};

export default Hospital;