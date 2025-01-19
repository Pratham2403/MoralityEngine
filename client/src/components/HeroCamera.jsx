import React from 'react'
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { easing } from 'maath';

const HeroCamera = ({children, isMobile}) => {

    const groupRef = useRef();

    //Here delta is the change and state is the current state
    useFrame((state,delta)=>{

        easing.damp3(state.camera.position, [0,0,30], 0.25, delta);  //camera position, target position, damping, delta that is the change that is supposed to happen

        //rotation animation for the desktops
        if(!isMobile){
            easing.dampE(groupRef.current.rotation,[-state.pointer.y/3,-state.pointer.x/5,0],0.25,delta)
        }
    })

  return (
    <group ref={groupRef} scale={1.3}>{children}</group>
  )
}

export default HeroCamera