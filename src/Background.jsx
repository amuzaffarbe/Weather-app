import React from 'react'

import background from "./assets/background.jpg"

const Background = (props) => {
  return (
    <div className='background'>
         <video src={props.video} autoPlay muted loop></video>
    </div>
  )
}

export default Background