 import React from 'react'
 import {Html, useProgress} from '@react-three/drei'

 const canvasLoader = () => {
    const {progress} = useProgress()

   return (
    <Html
        as="div"
        center
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        }}

    >
        <span className="canvas-loader"/>
        <p style={{fontSize: 14, color: '#f1f1f1', marginTop: 40, fontWeight: 800}}>
            {progress !=0 ? `${progress.toFixed(2)}%` : 'Loading...'}
        </p>

    </Html>
   )
 }
 
 export default canvasLoader