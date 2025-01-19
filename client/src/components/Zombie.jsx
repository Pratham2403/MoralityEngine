import React, { useEffect, useRef } from 'react'
import { useAnimations, useFBX, useGLTF } from '@react-three/drei'

export function Zombie({animationName='idle', ...props}) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/zombieMan.glb')

   //here you are trying to get the animations from the fbx file
   const {animations: idleAnimation} = useFBX('/models/animations/shove.fbx'); 
   //set the animation name
   idleAnimation[0].name = 'idle';
 
   //doing it for the other animations as well
   const {animations: clapAnimation} = useFBX('/models/animations/clapping.fbx'); 
   clapAnimation[0].name = 'clap';
 
   const {animations: saluteAnimation} = useFBX('/models/animations/salute.fbx'); 
   saluteAnimation[0].name = 'salute';
 
 
   const {animations: victoryAnimation} = useFBX('/models/animations/victory.fbx');
   victoryAnimation[0].name = 'victory';
 
   console.log(idleAnimation)
 
   //you are using the useAnimations hook to get the actions of the animation
   const {actions} = useAnimations([idleAnimation[0],clapAnimation[0],saluteAnimation[0],victoryAnimation[0]],group);
   console.log(actions);
   
     useEffect(() => {
         actions[animationName].reset().fadeIn(0.5).play();
         return () => actions[animationName].fadeOut(0.5);
     }, [animationName]);
 
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={1.918}>
          <group name="9154c3ff3f694b78a14c33cca2e42816fbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Object_4">
                  <primitive object={nodes._rootJoint} />
                  <skinnedMesh
                    name="Object_7"
                    geometry={nodes.Object_7.geometry}
                    material={materials.Body}
                    skeleton={nodes.Object_7.skeleton}
                  />
                  <group name="Object_6" />
                  <group name="model_T" />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/zombieMan.glb')

export default Zombie;
