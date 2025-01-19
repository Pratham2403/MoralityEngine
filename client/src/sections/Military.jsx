import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useMediaQuery } from 'react-responsive';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Leva, useControls } from 'leva';
import '../styles/traffic.css'

import CanvasLoader from '../components/canvasLoader.jsx';
import Cyborg from '../components/Cyborg.jsx';
import Ground from '../components/Shooting/ground.jsx';
import Human from '../components/Human.jsx';
import Shooter from '../components/Shooting/Shooter.jsx';

const Military = (props) => {
    
    
    const control = useControls('TrafficRoad',{
      scale:{
        value:2.5,
        min:0,
        max:1
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
        max:30
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
  
    const isMobile = useMediaQuery({maxWidth: 768});
  
    return (
      <div className="canvas-container">
  
          <Leva/> 
          <Canvas>
              <Suspense fallback={<CanvasLoader />}>
                  
                  <PerspectiveCamera makeDefault position={[0, 0, 30]} />
  
                    <OrbitControls 
                      maxPolarAngle={(70 * Math.PI) / 180}
                      minDistance={5}
                      maxDistance={50}
                    />

                    <Cyborg
                      scale={3.1}
                      rotation={[0,0,0]}
                      position={[-5.2,3,-6]}
                    />

                    <Ground
                      scale={2.5}
                      rotation={[0,0,0]}
                      position={[0,0,0]}
                      />

                    <Human
                      scale={3}
                      rotation={[0 , 2.9 ,0]}
                      position={[-8.4 , 3.5, 0]}  
                      animationName='victory'
                      />

                      <Shooter
                      scale={0.045}
                      rotation={[0,4.2,0]}
                      position={[18.8,1,0]}
                      />
  

  
                  <ambientLight intensity={1} />
                  <directionalLight intensity={0.5} position={[10, 10, 10]} />
  
  
              </Suspense>
          </Canvas>
        
    </div>
    
    );
  
  };
  
  export default Military;