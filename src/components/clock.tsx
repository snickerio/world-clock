import { useEffect, useState } from 'react'

interface ClockProps {
  offset: number
  size?: number
}

export default function Clock({ offset, size = 200 }: ClockProps) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const tick = () => {
      const utc = new Date()
      const localTime = new Date(utc.getTime() + offset * 60000)
      setTime(localTime)
    }

    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [offset])

  const seconds = time.getSeconds()
  const minutes = time.getMinutes()
  const hours = time.getHours()

  const secondDeg = seconds * 6
  const minuteDeg = minutes * 6 + seconds * 0.1
  const hourDeg = (hours % 12) * 30 + minutes * 0.5

  // Format digital time
  const digitalTime = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      {/* Analog clock */}
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          border: '5px solid black',
          position: 'relative',
          margin: '0 auto',
          backgroundColor: 'white',
        }}
      >
        {/* Hour hand */}
        <div
          style={{
            position: 'absolute',
            width: '4px',
            height: size / 3,
            backgroundColor: 'black',
            top: size / 6,
            left: size / 2 - 2,
            transformOrigin: 'bottom',
            transform: `rotate(${hourDeg}deg)`,
          }}
        />
        {/* Minute hand */}
        <div
          style={{
            position: 'absolute',
            width: '2px',
            height: size / 2.5,
            backgroundColor: 'black',
            top: size / 10,
            left: size / 2 - 1,
            transformOrigin: 'bottom',
            transform: `rotate(${minuteDeg}deg)`,
          }}
        />
        {/* Second hand */}
        <div
          style={{
            position: 'absolute',
            width: '1px',
            height: size / 2.5,
            backgroundColor: 'red',
            top: size / 10,
            left: size / 2 - 0.5,
            transformOrigin: 'bottom',
            transform: `rotate(${secondDeg}deg)`,
          }}
        />
      </div>

      {/* Digital time */}
      <div
        style={{
          marginTop: '10px',
          fontSize: '1.2rem',
          fontFamily: 'monospace',
          fontWeight: 'bold',
        }}
      >
        {digitalTime}
      </div>
    </div>
  )
}
