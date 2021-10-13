import React, { useEffect, useState } from 'react'

const Clock = () => {
  const [ time, setTime] = useState(new Date());

  const changeTime = () => {
    setTime(new Date())
  }

  useEffect(() => {
    const tick = setInterval(() => {
      changeTime()
    }, 1000)
    return () => clearInterval(tick)
  })

  return (
     <div className='clock'>
       {time.toLocaleTimeString()}
     </div>
  )
}

export default Clock
