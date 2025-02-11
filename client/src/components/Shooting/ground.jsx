/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Zhoslen.Makoev (https://sketchfab.com/Zhoslen.Makoev)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/ground-28348668d86f454880166a8e6b6293dd
Title: Ground
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Ground(props) {
  const { nodes, materials } = useGLTF('/models/military/ground.glb')
  return (
    <group {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, -2.551]}>
        <group rotation={[-Math.PI, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Ground_02_Ground_02_u1_v1_0.geometry}
            material={materials.Ground_02_u1_v1}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Ground_02_Ground_02_u1_v1_0_1.geometry}
            material={materials.Ground_02_u1_v1}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Ground_02_Ground_02_u1_v1_0_2.geometry}
            material={materials.Ground_02_u1_v1}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Ground_02_Ground_02_u1_v1_0_3.geometry}
            material={materials.Ground_02_u1_v1}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Ground_02_Ground_02_u1_v1_0_4.geometry}
            material={materials.Ground_02_u1_v1}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Ground_02_Ground_02_u1_v1_0_5.geometry}
            material={materials.Ground_02_u1_v1}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Ground_02_Ground_02_u1_v1_0_6.geometry}
            material={materials.Ground_02_u1_v1}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Ground_02_Ground_02_u1_v1_0_7.geometry}
            material={materials.Ground_02_u1_v1}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Ground_02_Ground_02_u1_v1_0_8.geometry}
            material={materials.Ground_02_u1_v1}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Ground_02_Ground_02_u1_v1_0_9.geometry}
            material={materials.Ground_02_u1_v1}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Ground_02_Ground_02_u1_v1_0_10.geometry}
            material={materials.Ground_02_u1_v1}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/military/ground.glb')
export default Ground;