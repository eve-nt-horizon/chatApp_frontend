import React, { useEffect } from 'react'
import { setupCanvas } from '../api/canvas-service'
const MainCanvas = () => {
    useEffect(()=>{
        setupCanvas();
    },[])
  return (
    <canvas style={{border:'1px solid black'}} className='whiteboard'></canvas>
  )
}

export default MainCanvas