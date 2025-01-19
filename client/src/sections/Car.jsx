import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useMediaQuery } from 'react-responsive';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Leva, useControls } from 'leva';
import '../styles/traffic.css'

import CanvasLoader from '../components/canvasLoader.jsx';
// import { calculateSizes } from '../constants/index.js';

import TrafficRoad from '../components/TrafficRoad/TrafficRoad.jsx';
import Human from '../components/Human.jsx';
import Barrier from '../components/TrafficRoad/Barrier.jsx'
import Vehicle from '../components/TrafficRoad/Vehicle.jsx';


// import Button from '../components/Button.jsx';

const Car = (props) => {

  
  const type = props.type;

  // const serverObject = {
  //   elderly:  parseInt(props.serverObject[0].split(" ")[0]),
  //   adult: parseInt(props.serverObject[1].split(" ")[0]),
  //   child: parseInt(props.serverObject[2].split(" ")[0]),
  //   people: 6,
  //   animal: parseInt(props.serverObject[3].split(" ")[0]),
  // }

  const objectPosition = [
    [-4.2,0.1,4],
    [-3.7,0.1,4],
    [-3.2,0.1,4],
    [-4.2,0.1,5],
    [-3.7,0.1,5],
    [-3.2,0.1,5],
    [-4.2,0.1,6],
    [-3.7,0.1,6],
    [-3.2,0.1,6],
  ]
  
  const [currPosition,setCurrPosition] = useState(0)

  const changePosition = () => {
    setCurrPosition(currPosition+1)
    return objectPosition[currPosition]
  }
  
  const control = useControls('TrafficRoad',{
    scale:{
      value:2.5,
      min:-10,
      max:1000
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

                  <TrafficRoad
                    scale={1.7}
                    position={[-8.8,0,12]}
                    rotation={[-Math.PI, Math.PI/2,0]}
                  />    

                  <Vehicle
                    scale={123}
                    position={[-4.5,0.1,-9]}
                    rotation={[0,0,0]}
                    type={type}  
                  />
                 
                  <Human
                    scale={0.9}
                    position={objectPosition[0]}
                    rotation={[0, Math.PI / 2, 0]}
                  />

                  <Barrier
                    scale={3}
                    position={[0.2, 0 , 3]}
                    rotation={[0, Math.PI / 2, 0]}
                  />

                <ambientLight intensity={1} />
                <directionalLight intensity={0.5} position={[10, 10, 10]} />


            </Suspense>
        </Canvas>
      
  </div>
  
  );

};

export default Car;