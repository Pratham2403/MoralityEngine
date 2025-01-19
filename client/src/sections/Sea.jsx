import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useMediaQuery } from 'react-responsive';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Leva, useControls } from 'leva';
import '../styles/traffic.css'

import CanvasLoader from '../components/canvasLoader.jsx';
import Human from '../components/Human.jsx';
import HumanTwo from '../components/HumanTwo.jsx';
import Boat from '../components/SeaBoat/Boat.jsx';



const Sea = (props) => {
    
    const control = useControls('TrafficRoad',{
      scale:{
        value:0.5,
        min:0,
        max:100
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
        min:0,
        max:5
      },
      positionZ:{
        value:0,
        min:-10,
        max:0
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
                      maxPolarAngle={(85 * Math.PI) / 180}
                      minDistance={5}
                      maxDistance={50}
                    />
  
                    <Boat
                        scale={0.03}
                        rotation = {[0,0,0]}
                        position = {[0,0,0]}
                    />

                    <Human
                      key={0}
                        animationName='salute'
                        scale={3}
                        position={[-0.2, 1.75, -8]}
                        rotation={[0,0,0]}
                    />

                    <HumanTwo
                        animationName='clap'
                        scale={3}
                        position={[0, 1 , -5]}
                        rotation={[0, Math.PI,0]}
                    />


  
                  <ambientLight intensity={1} />
                  <directionalLight intensity={0.5} position={[10, 10, 10]} />
  
  
              </Suspense>
          </Canvas>
        
    </div>
    
    );
  
  };
  
  export default Sea;